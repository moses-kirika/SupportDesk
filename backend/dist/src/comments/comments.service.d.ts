import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class CommentsService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(createCommentDto: CreateCommentDto, userId: string, organizationId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.UserRole;
            id: string;
        };
    } & {
        organizationId: string;
        id: string;
        createdAt: Date;
        ticketId: string;
        content: string;
        userId: string;
    }>;
    findByTicket(ticketId: string, organizationId: string): Promise<({
        user: {
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.UserRole;
            id: string;
        };
    } & {
        organizationId: string;
        id: string;
        createdAt: Date;
        ticketId: string;
        content: string;
        userId: string;
    })[]>;
}
