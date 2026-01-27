import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(req: any): Promise<({
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
    getUnreadCount(req: any): Promise<{
        count: number;
    }>;
    markAsRead(id: string, req: any): Promise<{
        success: boolean;
    }>;
    markAllAsRead(req: any): Promise<{
        success: boolean;
    }>;
}
