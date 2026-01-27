import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: any) {
        return this.commentsService.create(createCommentDto, user.id, user.organizationId);
    }

    @Get('ticket/:ticketId')
    findByTicket(@Param('ticketId') ticketId: string, @CurrentUser() user: any) {
        return this.commentsService.findByTicket(ticketId, user.organizationId);
    }
}
