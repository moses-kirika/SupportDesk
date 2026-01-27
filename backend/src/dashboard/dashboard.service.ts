import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getStats(organizationId: string, role: UserRole, userId: string) {
        // Base where clause for organization
        const whereOrg = { organizationId };

        // 1. Ticket Counts
        const totalTickets = await this.prisma.ticket.count({ where: whereOrg });
        const openTickets = await this.prisma.ticket.count({ where: { ...whereOrg, status: 'OPEN' } });
        const resolvedTickets = await this.prisma.ticket.count({ where: { ...whereOrg, status: { in: ['RESOLVED', 'CLOSED'] } } });
        const inProgressTickets = await this.prisma.ticket.count({ where: { ...whereOrg, status: 'IN_PROGRESS' } });

        // 2. Personal Workload (for Techs) or Personal Tickets (for Users)
        let myTicketsCount = 0;
        if (role === UserRole.TECHNICIAN || role === UserRole.ADMIN) {
            myTicketsCount = await this.prisma.ticket.count({ where: { ...whereOrg, assignedToId: userId, status: { notIn: ['RESOLVED', 'CLOSED'] } } });
        } else {
            myTicketsCount = await this.prisma.ticket.count({ where: { ...whereOrg, createdById: userId, status: { notIn: ['RESOLVED', 'CLOSED'] } } });
        }

        // 3. Recent Activity (last 5 tickets updated)
        const recentTickets = await this.prisma.ticket.findMany({
            where: whereOrg,
            orderBy: { updatedAt: 'desc' },
            take: 5,
            include: {
                creator: { select: { firstName: true, lastName: true } },
                assignedTechnician: { select: { firstName: true, lastName: true } }
            }
        });

        return {
            counts: {
                total: totalTickets,
                open: openTickets,
                resolved: resolvedTickets,
                inProgress: inProgressTickets,
                myPending: myTicketsCount
            },
            recentActivity: recentTickets
        };
    }
}
