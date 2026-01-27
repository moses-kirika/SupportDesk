import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, UseGuards, Request, Res, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { Response } from 'express';

@Controller('attachments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttachmentsController {
    constructor(private readonly attachmentsService: AttachmentsService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB limit
                ],
            }),
        ) file: Express.Multer.File,
        @Request() req: any,
    ) {
        // We expect ticketId in the body body, but FileInterceptor handles multipart/form-data. 
        // We need to access body fields. 
        // Note: With FileInterceptor, other fields are available in req.body
        const ticketId = req.body.ticketId;

        return this.attachmentsService.uploadFile(file, ticketId, req.user.userId, req.user.organizationId);
    }

    @Get('ticket/:ticketId')
    async findAllByTicket(@Param('ticketId') ticketId: string, @Request() req: any) {
        return this.attachmentsService.findByTicket(ticketId, req.user.organizationId);
    }

    @Get(':id/file')
    async getFile(@Param('id') id: string, @Request() req: any, @Res({ passthrough: true }) res: Response) {
        const { file, filename, mimeType } = await this.attachmentsService.getFile(id, req.user.organizationId);

        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `attachment; filename="${filename}"`,
        });

        return file;
    }
}
