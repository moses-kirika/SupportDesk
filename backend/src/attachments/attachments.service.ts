import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createReadStream, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Injectable()
export class AttachmentsService {
    private readonly uploadDir = './uploads';

    constructor(private prisma: PrismaService) {
        // Ensure upload directory exists
        if (!existsSync(this.uploadDir)) {
            mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async uploadFile(file: Express.Multer.File, ticketId: string, uploaderId: string, organizationId: string) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
        });

        if (!ticket || ticket.organizationId !== organizationId) {
            throw new NotFoundException('Ticket not found');
        }

        // Generate a unique filename to avoid collisions? 
        // For simplicity, we might prepend timestamp or uuid. 
        // Let's use the file.filename if provided by disk storage, 
        // but since we are handling the buffer manually or using default memory storage:
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        const filePath = join(this.uploadDir, uniqueFilename);

        writeFileSync(filePath, file.buffer);

        const attachment = await this.prisma.attachment.create({
            data: {
                filename: file.originalname,
                url: filePath, // Store local path for now, in real app might be S3 URL
                fileType: file.mimetype,
                fileSize: file.size,
                ticketId: ticketId,
                uploadedById: uploaderId,
                organizationId: organizationId,
            },
        });

        return attachment;
    }

    async getFile(attachmentId: string, organizationId: string): Promise<{ file: StreamableFile; filename: string; mimeType: string }> {
        const attachment = await this.prisma.attachment.findUnique({
            where: { id: attachmentId },
        });

        if (!attachment || attachment.organizationId !== organizationId) {
            throw new NotFoundException('Attachment not found');
        }

        if (!existsSync(attachment.url)) {
            throw new NotFoundException('File not found on server');
        }

        const file = createReadStream(attachment.url);
        return {
            file: new StreamableFile(file),
            filename: attachment.filename,
            mimeType: attachment.fileType,
        };
    }

    async findByTicket(ticketId: string, organizationId: string) {
         const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
        });

        if (!ticket || ticket.organizationId !== organizationId) {
            throw new NotFoundException('Ticket not found');
        }

        return this.prisma.attachment.findMany({
            where: { ticketId },
            include: {
                uploader: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });
    }
}
