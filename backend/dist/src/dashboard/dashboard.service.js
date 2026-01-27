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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats(organizationId, role, userId) {
        const whereOrg = { organizationId };
        const totalTickets = await this.prisma.ticket.count({ where: whereOrg });
        const openTickets = await this.prisma.ticket.count({ where: { ...whereOrg, status: 'OPEN' } });
        const resolvedTickets = await this.prisma.ticket.count({ where: { ...whereOrg, status: { in: ['RESOLVED', 'CLOSED'] } } });
        const inProgressTickets = await this.prisma.ticket.count({ where: { ...whereOrg, status: 'IN_PROGRESS' } });
        let myTicketsCount = 0;
        if (role === client_1.UserRole.TECHNICIAN || role === client_1.UserRole.ADMIN) {
            myTicketsCount = await this.prisma.ticket.count({ where: { ...whereOrg, assignedToId: userId, status: { notIn: ['RESOLVED', 'CLOSED'] } } });
        }
        else {
            myTicketsCount = await this.prisma.ticket.count({ where: { ...whereOrg, createdById: userId, status: { notIn: ['RESOLVED', 'CLOSED'] } } });
        }
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map