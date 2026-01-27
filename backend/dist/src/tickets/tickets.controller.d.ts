import { TicketsService } from './tickets.service';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto, user: any): Promise<{
        creator: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        organizationId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        status: import("@prisma/client").$Enums.TicketStatus;
        createdById: string;
        assignedToId: string | null;
        resolvedAt: Date | null;
    }>;
    findAll(user: any, status?: string, priority?: string, assignedToMe?: string): Promise<({
        _count: {
            comments: number;
            attachments: number;
        };
        creator: {
            firstName: string;
            lastName: string;
            id: string;
        };
        assignedTechnician: {
            firstName: string;
            lastName: string;
            id: string;
        } | null;
    } & {
        organizationId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        status: import("@prisma/client").$Enums.TicketStatus;
        createdById: string;
        assignedToId: string | null;
        resolvedAt: Date | null;
    })[]>;
    findOne(id: string, user: any): Promise<{
        comments: ({
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
        })[];
        attachments: {
            url: string;
            organizationId: string;
            id: string;
            createdAt: Date;
            ticketId: string;
            filename: string;
            fileType: string;
            fileSize: number;
            uploadedById: string;
        }[];
        creator: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
        assignedTechnician: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        } | null;
    } & {
        organizationId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        status: import("@prisma/client").$Enums.TicketStatus;
        createdById: string;
        assignedToId: string | null;
        resolvedAt: Date | null;
    }>;
    update(id: string, updateTicketDto: UpdateTicketDto, user: any): Promise<{
        organizationId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        status: import("@prisma/client").$Enums.TicketStatus;
        createdById: string;
        assignedToId: string | null;
        resolvedAt: Date | null;
    }>;
    assign(id: string, technicianId: string, user: any): Promise<{
        assignedTechnician: {
            firstName: string;
            lastName: string;
            id: string;
        } | null;
    } & {
        organizationId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        status: import("@prisma/client").$Enums.TicketStatus;
        createdById: string;
        assignedToId: string | null;
        resolvedAt: Date | null;
    }>;
    remove(id: string, user: any): Promise<{
        organizationId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        category: string;
        priority: import("@prisma/client").$Enums.TicketPriority;
        status: import("@prisma/client").$Enums.TicketStatus;
        createdById: string;
        assignedToId: string | null;
        resolvedAt: Date | null;
    }>;
}
