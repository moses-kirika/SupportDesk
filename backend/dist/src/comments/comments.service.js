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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
let CommentsService = class CommentsService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(createCommentDto, userId, organizationId) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: createCommentDto.ticketId },
        });
        if (!ticket || ticket.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Ticket not found');
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
        if (userId === ticket.createdById) {
            if (ticket.assignedToId) {
                await this.notificationsService.create(ticket.assignedToId, client_1.NotificationType.NEW_COMMENT, ticket.id);
            }
        }
        else {
            if (ticket.createdById !== userId) {
                await this.notificationsService.create(ticket.createdById, client_1.NotificationType.NEW_COMMENT, ticket.id);
            }
        }
        if (ticket.createdById === userId && (ticket.status === 'WAITING' || ticket.status === 'RESOLVED')) {
            await this.prisma.ticket.update({
                where: { id: ticket.id },
                data: { status: 'IN_PROGRESS' }
            });
        }
        return comment;
    }
    async findByTicket(ticketId, organizationId) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
        });
        if (!ticket || ticket.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Ticket not found');
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
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map