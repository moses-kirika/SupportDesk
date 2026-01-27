import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { UserRole, Prisma, NotificationType } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TicketsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async create(createTicketDto: CreateTicketDto, userId: string, organizationId: string) {
        const ticket = await this.prisma.ticket.create({
            data: {
                ...createTicketDto,
                createdById: userId,
                organizationId: organizationId,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });

        // Notify Admins
        const admins = await this.prisma.user.findMany({
            where: { organizationId, role: UserRole.ADMIN },
            select: { id: true },
        });

        for (const admin of admins) {
            // Avoid notifying self if admin created it
            if (admin.id !== userId) {
                await this.notificationsService.create(admin.id, NotificationType.TICKET_CREATED, ticket.id);
            }
        }

        return ticket;
    }

    async findAll(
        organizationId: string,
        role: UserRole,
        userId: string,
        params: {
            status?: string;
            priority?: string;
            assignedToMe?: boolean;
        }
    ) {
        const where: Prisma.TicketWhereInput = {
            organizationId,
        };

        if (params.status) {
            where.status = params.status as any;
        }

        if (params.priority) {
            where.priority = params.priority as any;
        }

        if (role === UserRole.USER) {
            // Users can only see their own tickets
            where.createdById = userId;
        } else if (params.assignedToMe && role === UserRole.TECHNICIAN) {
            // Technicians can filter by assigned to them
            where.assignedToId = userId;
        }
        // Admin and Technician (default) see all tickets in organization

        return this.prisma.ticket.findMany({
            where,
            include: {
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                assignedTechnician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                _count: {
                    select: { comments: true, attachments: true },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }

    async findOne(id: string, organizationId: string, role: UserRole, userId: string) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                assignedTechnician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                role: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                attachments: true,
            },
        });

        if (!ticket) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }

        if (ticket.organizationId !== organizationId) {
            throw new ForbiddenException('Access to this ticket is denied');
        }

        if (role === UserRole.USER && ticket.createdById !== userId) {
            throw new ForbiddenException('You can only view your own tickets');
        }

        return ticket;
    }

    async update(
        id: string,
        updateTicketDto: UpdateTicketDto,
        organizationId: string,
        role: UserRole,
        userId: string // adding userId just in case we need it for logic later
    ) {
        await this.findOne(id, organizationId, role, userId); // check existence and permissions

        // If User, restrict what fields they can update (e.g., maybe they can only Close, or update description if not resolved)
        // For MVP, assuming Users can edit their tickets freely or we restrict status update ?
        // Let's enforce that USER can only change status to CLOSED or update basic info.
        // For now, I'll allow full update but real app might restrict.

        const updatedTicket = await this.prisma.ticket.update({
            where: { id },
            data: updateTicketDto,
        });

        // Notify Creator if status changed
        if (updateTicketDto.status) {
            const ticket = await this.prisma.ticket.findUnique({ where: { id } }); // fetch fresh or rely on result? result has updated data.
            if (ticket && ticket.createdById !== userId) { // Don't notify if user updated their own ticket status (e.g. re-open)
                const type = updateTicketDto.status === 'RESOLVED' || updateTicketDto.status === 'CLOSED'
                    ? NotificationType.TICKET_RESOLVED
                    : NotificationType.STATUS_CHANGED;

                await this.notificationsService.create(ticket.createdById, type, id);
            }
        }

        return updatedTicket;
    }

    async assign(id: string, technicianId: string, organizationId: string) {
        // Verify ticket exists and belongs to org
        const ticket = await this.prisma.ticket.findUnique({ where: { id } });
        if (!ticket || ticket.organizationId !== organizationId) {
            throw new NotFoundException('Ticket not found');
        }

        // Verify technician exists, belongs to org, and is a technician/admin
        const tech = await this.prisma.user.findUnique({ where: { id: technicianId } });
        if (!tech || tech.organizationId !== organizationId) {
            throw new NotFoundException('Technician not found in this organization');
        }
        if (tech.role === UserRole.USER) {
            throw new ForbiddenException('Cannot assign ticket to a regular user');
        }

        const updatedTicket = await this.prisma.ticket.update({
            where: { id },
            data: {
                assignedToId: technicianId,
                status: ticket.status === 'OPEN' ? 'IN_PROGRESS' : undefined, // Auto-move to In Progress if Open
            },
            include: {
                assignedTechnician: {
                    select: { id: true, firstName: true, lastName: true },
                },
            }
        });

        // Notify Technician
        if (technicianId) {
            await this.notificationsService.create(technicianId, NotificationType.TICKET_ASSIGNED, id);
        }

        return updatedTicket;
    }

    async remove(id: string, organizationId: string) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id } });
        if (!ticket || ticket.organizationId !== organizationId) {
            throw new NotFoundException('Ticket not found');
        }

        return this.prisma.ticket.delete({
            where: { id },
        });
    }
}
