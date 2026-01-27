"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
let TicketsService = class TicketsService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(createTicketDto, userId, organizationId) {
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
        const admins = await this.prisma.user.findMany({
            where: { organizationId, role: client_1.UserRole.ADMIN },
            select: { id: true },
        });
        for (const admin of admins) {
            if (admin.id !== userId) {
                await this.notificationsService.create(admin.id, client_1.NotificationType.TICKET_CREATED, ticket.id);
            }
        }
        return ticket;
    }
    async findAll(organizationId, role, userId, params) {
        const where = {
            organizationId,
        };
        if (params.status) {
            where.status = params.status;
        }
        if (params.priority) {
            where.priority = params.priority;
        }
        if (role === client_1.UserRole.USER) {
            where.createdById = userId;
        }
        else if (params.assignedToMe && role === client_1.UserRole.TECHNICIAN) {
            where.assignedToId = userId;
        }
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
    async findOne(id, organizationId, role, userId) {
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
            throw new common_1.NotFoundException(`Ticket with ID ${id} not found`);
        }
        if (ticket.organizationId !== organizationId) {
            throw new common_1.ForbiddenException('Access to this ticket is denied');
        }
        if (role === client_1.UserRole.USER && ticket.createdById !== userId) {
            throw new common_1.ForbiddenException('You can only view your own tickets');
        }
        return ticket;
    }
    async update(id, updateTicketDto, organizationId, role, userId) {
        await this.findOne(id, organizationId, role, userId);
        const updatedTicket = await this.prisma.ticket.update({
            where: { id },
            data: updateTicketDto,
        });
        if (updateTicketDto.status) {
            const ticket = await this.prisma.ticket.findUnique({ where: { id } });
            if (ticket && ticket.createdById !== userId) {
                const type = updateTicketDto.status === 'RESOLVED' || updateTicketDto.status === 'CLOSED'
                    ? client_1.NotificationType.TICKET_RESOLVED
                    : client_1.NotificationType.STATUS_CHANGED;
                await this.notificationsService.create(ticket.createdById, type, id);
            }
        }
        return updatedTicket;
    }
    async assign(id, technicianId, organizationId) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id } });
        if (!ticket || ticket.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        const tech = await this.prisma.user.findUnique({ where: { id: technicianId } });
        if (!tech || tech.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Technician not found in this organization');
        }
        if (tech.role === client_1.UserRole.USER) {
            throw new common_1.ForbiddenException('Cannot assign ticket to a regular user');
        }
        const updatedTicket = await this.prisma.ticket.update({
            where: { id },
            data: {
                assignedToId: technicianId,
                status: ticket.status === 'OPEN' ? 'IN_PROGRESS' : undefined,
            },
            include: {
                assignedTechnician: {
                    select: { id: true, firstName: true, lastName: true },
                },
            }
        });
        if (technicianId) {
            await this.notificationsService.create(technicianId, client_1.NotificationType.TICKET_ASSIGNED, id);
        }
        return updatedTicket;
    }
    async remove(id, organizationId) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id } });
        if (!ticket || ticket.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        return this.prisma.ticket.delete({
            where: { id },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map