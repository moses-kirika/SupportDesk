import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto, UpdateTicketDto } from './dto/ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post()
    create(@Body() createTicketDto: CreateTicketDto, @CurrentUser() user: any) {
        return this.ticketsService.create(createTicketDto, user.id, user.organizationId);
    }

    @Get()
    findAll(
        @CurrentUser() user: any,
        @Query('status') status?: string,
        @Query('priority') priority?: string,
        @Query('assignedToMe') assignedToMe?: string,
    ) {
        return this.ticketsService.findAll(user.organizationId, user.role, user.id, {
            status,
            priority,
            assignedToMe: assignedToMe === 'true',
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser() user: any) {
        return this.ticketsService.findOne(id, user.organizationId, user.role, user.id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTicketDto: UpdateTicketDto,
        @CurrentUser() user: any,
    ) {
        // Basic user can update ticket, logic inside service handles limitations if needed
        return this.ticketsService.update(id, updateTicketDto, user.organizationId, user.role, user.id);
    }

    @Patch(':id/assign')
    @Roles(UserRole.ADMIN, UserRole.TECHNICIAN) // Only Admins or Technicians can assign
    assign(
        @Param('id') id: string,
        @Body('technicianId') technicianId: string,
        @CurrentUser() user: any,
    ) {
        return this.ticketsService.assign(id, technicianId, user.organizationId);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN) // Only Admin can delete tickets
    remove(@Param('id') id: string, @CurrentUser() user: any) {
        return this.ticketsService.remove(id, user.organizationId);
    }
}
