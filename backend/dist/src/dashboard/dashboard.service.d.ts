import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(organizationId: string, role: UserRole, userId: string): Promise<{
        counts: {
            total: number;
            open: number;
            resolved: number;
            inProgress: number;
            myPending: number;
        };
        recentActivity: ({
            creator: {
                firstName: string;
                lastName: string;
            };
            assignedTechnician: {
                firstName: string;
                lastName: string;
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
        })[];
    }>;
}
