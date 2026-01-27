import { Controller, Get, Patch, Param, UseGuards, Request, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Get()
    async findAll(@Request() req: any) {
        return this.notificationsService.findAll(req.user.userId);
    }

    @Get('unread-count')
    async getUnreadCount(@Request() req: any) {
        const count = await this.notificationsService.getUnreadCount(req.user.userId);
        return { count };
    }

    @Patch(':id/read')
    async markAsRead(@Param('id') id: string, @Request() req: any) {
        return this.notificationsService.markAsRead(id, req.user.userId);
    }

    @Patch('read-all')
    async markAllAsRead(@Request() req: any) {
        return this.notificationsService.markAllAsRead(req.user.userId);
    }
}
