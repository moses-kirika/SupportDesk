import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(recipientId: string, type: NotificationType, ticketId?: string): Promise<{
        id: string;
        createdAt: Date;
        type: import("@prisma/client").$Enums.NotificationType;
        read: boolean;
        recipientId: string;
        ticketId: string | null;
    }>;
    findAll(userId: string): Promise<({
        ticket: {
            id: string;
            title: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        type: import("@prisma/client").$Enums.NotificationType;
        read: boolean;
        recipientId: string;
        ticketId: string | null;
    })[]>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(id: string, userId: string): Promise<{
        success: boolean;
    }>;
    markAllAsRead(userId: string): Promise<{
        success: boolean;
    }>;
}
