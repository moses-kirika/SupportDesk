import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserRole, NotificationType } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CommentsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService
    ) { }

    async create(createCommentDto: CreateCommentDto, userId: string, organizationId: string) {
        // Verify ticket exists and belongs to org
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: createCommentDto.ticketId },
        });

        if (!ticket || ticket.organizationId !== organizationId) {
            throw new NotFoundException('Ticket not found');
        }

        const comment = await this.prisma.comment.create({
            data: {
                content: createCommentDto.content,
                ticketId: createCommentDto.ticketId,
                organizationId: organizationId,
                userId: userId,
            },
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
        });

        // Notify
        if (userId === ticket.createdById) {
            // User commented, notify assigned technician if any
            if (ticket.assignedToId) {
                await this.notificationsService.create(ticket.assignedToId, NotificationType.NEW_COMMENT, ticket.id);
            }
        } else {
            // Technician/Admin commented, notify ticket creator
            // Don't notify if they are commenting on their own ticket (e.g. tech created a ticket?) 
            // - Assuming tech created ticket, they are creator.
            if (ticket.createdById !== userId) {
                await this.notificationsService.create(ticket.createdById, NotificationType.NEW_COMMENT, ticket.id);
            }
        }

        // Determine status update:
        // If Admin/Technician comments on user's ticket, maybe change status?
        // If User comments on Waiting ticket, change to Open/InProgress?

        // Logic: If user replies to a ticket that is WAITING or RESOLVED, set to IN_PROGRESS (so tech sees it)
        if (ticket.createdById === userId && (ticket.status === 'WAITING' || ticket.status === 'RESOLVED')) {
            await this.prisma.ticket.update({
                where: { id: ticket.id },
                data: { status: 'IN_PROGRESS' }
            });
        }

        // Logic: If Technician replies to ticket, set to WAITING (waiting for user)? 
        // This is often a manual toggle, so maybe don't auto-update too aggressively. 
        // Let's stick to user-activity waking up the ticket.

        return comment;
    }

    async findByTicket(ticketId: string, organizationId: string) {
        // First check ticket access
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
        });

        if (!ticket || ticket.organizationId !== organizationId) {
            throw new NotFoundException('Ticket not found');
        }

        return this.prisma.comment.findMany({
            where: { ticketId },
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
        });
    }
}
