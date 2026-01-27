import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { UserRole } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
export declare class TicketsService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(createTicketDto: CreateTicketDto, userId: string, organizationId: string): Promise<{
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
    findAll(organizationId: string, role: UserRole, userId: string, params: {
        status?: string;
        priority?: string;
        assignedToMe?: boolean;
    }): Promise<({
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
    findOne(id: string, organizationId: string, role: UserRole, userId: string): Promise<{
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
    update(id: string, updateTicketDto: UpdateTicketDto, organizationId: string, role: UserRole, userId: string): Promise<{
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
    assign(id: string, technicianId: string, organizationId: string): Promise<{
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
    remove(id: string, organizationId: string): Promise<{
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
