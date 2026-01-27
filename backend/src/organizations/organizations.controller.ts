import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto, UpdateOrganizationDto, InviteUserDto } from './dto/organization.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) { }

    @Get('my')
    findMyOrganization(@CurrentUser() user: any) {
        return this.organizationsService.findOne(user.organizationId);
    }

    @Patch('my')
    @Roles(UserRole.ADMIN)
    updateMyOrganization(@CurrentUser() user: any, @Body() updateOrganizationDto: UpdateOrganizationDto) {
        return this.organizationsService.update(user.organizationId, updateOrganizationDto);
    }

    @Get('users')
    @Roles(UserRole.ADMIN, UserRole.TECHNICIAN)
    getUsers(@CurrentUser() user: any) {
        return this.organizationsService.getUsers(user.organizationId);
    }

    @Post('invite')
    @Roles(UserRole.ADMIN)
    inviteUser(@CurrentUser() user: any, @Body() inviteUserDto: InviteUserDto) {
        return this.organizationsService.inviteUser(user.organizationId, inviteUserDto);
    }
}
