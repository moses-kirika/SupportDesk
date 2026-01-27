import { OrganizationsService } from './organizations.service';
import { UpdateOrganizationDto, InviteUserDto } from './dto/organization.dto';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    findMyOrganization(user: any): Promise<{
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
    updateMyOrganization(user: any, updateOrganizationDto: UpdateOrganizationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    getUsers(user: any): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
    }[]>;
    inviteUser(user: any, inviteUserDto: InviteUserDto): Promise<{
        message: string;
    }>;
}
