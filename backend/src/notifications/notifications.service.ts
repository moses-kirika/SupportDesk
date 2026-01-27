import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) { }

    async create(recipientId: string, type: NotificationType, ticketId?: string) {
        return this.prisma.notification.create({
            data: {
                recipientId,
                type,
                ticketId,
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.notification.findMany({
            where: { recipientId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                ticket: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        });
    }

    async getUnreadCount(userId: string) {
        return this.prisma.notification.count({
            where: {
                recipientId: userId,
                read: false,
            },
        });
    }

    async markAsRead(id: string, userId: string) {
        // Ensure notification belongs to user
        await this.prisma.notification.updateMany({
            where: {
                id,
                recipientId: userId,
            },
            data: {
                read: true,
            },
        });
        return { success: true };
    }

    async markAllAsRead(userId: string) {
        await this.prisma.notification.updateMany({
            where: { recipientId: userId, read: false },
            data: { read: true }
        });
        return { success: true };
    }
}
