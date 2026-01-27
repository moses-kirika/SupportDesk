import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto, user: any): Promise<{
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
    findByTicket(ticketId: string, user: any): Promise<({
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
