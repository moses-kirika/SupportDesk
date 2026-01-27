import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto, UpdateOrganizationDto, InviteUserDto } from './dto/organization.dto';
import { UserRole } from '@prisma/client';
// Note: We might want email service here to send invitations

@Injectable()
export class OrganizationsService {
    constructor(private prisma: PrismaService) { }

    async create(createOrganizationDto: CreateOrganizationDto) {
        return this.prisma.organization.create({
            data: createOrganizationDto,
        });
    }

    async findOne(id: string) {
        const org = await this.prisma.organization.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { users: true, tickets: true }
                }
            }
        });

        if (!org) {
            throw new NotFoundException('Organization not found');
        }
        return org;
    }

    async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
        return this.prisma.organization.update({
            where: { id },
            data: updateOrganizationDto,
        });
    }

    async getUsers(organizationId: string) {
        return this.prisma.user.findMany({
            where: { organizationId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true
            }
        });
    }

    // A basic invite mock as actual email/invite flow is complex
    async inviteUser(organizationId: string, inviteUserDto: InviteUserDto) {
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: inviteUserDto.email }
        });

        if (existingUser) {
            throw new BadRequestException('User already registered');
        }

        // In a real app, this would send an email with a token to join
        return { message: `Invitation sent to ${inviteUserDto.email}` };
    }
}
