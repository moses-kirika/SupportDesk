import { AttachmentsService } from './attachments.service';
import type { Response } from 'express';
export declare class AttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: AttachmentsService);
    uploadFile(file: Express.Multer.File, req: any): Promise<{
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
    findAllByTicket(ticketId: string, req: any): Promise<({
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
    getFile(id: string, req: any, res: Response): Promise<import("@nestjs/common").StreamableFile>;
}
