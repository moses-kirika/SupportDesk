import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto, UpdateOrganizationDto, InviteUserDto } from './dto/organization.dto';
export declare class OrganizationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrganizationDto: CreateOrganizationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    findOne(id: string): Promise<{
        _count: {
            users: number;
            tickets: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    getUsers(organizationId: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
    }[]>;
    inviteUser(organizationId: string, inviteUserDto: InviteUserDto): Promise<{
        message: string;
    }>;
}
