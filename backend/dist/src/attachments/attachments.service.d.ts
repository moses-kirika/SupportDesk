import { StreamableFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class AttachmentsService {
    private prisma;
    private readonly uploadDir;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File, ticketId: string, uploaderId: string, organizationId: string): Promise<{
        url: string;
        organizationId: string;
        id: string;
        createdAt: Date;
        ticketId: string;
        filename: string;
        fileType: string;
        fileSize: number;
        uploadedById: string;
    }>;
    getFile(attachmentId: string, organizationId: string): Promise<{
        file: StreamableFile;
        filename: string;
        mimeType: string;
    }>;
    findByTicket(ticketId: string, organizationId: string): Promise<({
        uploader: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        url: string;
        organizationId: string;
        id: string;
        createdAt: Date;
        ticketId: string;
        filename: string;
        fileType: string;
        fileSize: number;
        uploadedById: string;
    })[]>;
}
