"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs_1 = require("fs");
const path_1 = require("path");
let AttachmentsService = class AttachmentsService {
    prisma;
    uploadDir = './uploads';
    constructor(prisma) {
        this.prisma = prisma;
        if (!(0, fs_1.existsSync)(this.uploadDir)) {
            (0, fs_1.mkdirSync)(this.uploadDir, { recursive: true });
        }
    }
    async uploadFile(file, ticketId, uploaderId, organizationId) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
        });
        if (!ticket || ticket.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        const filePath = (0, path_1.join)(this.uploadDir, uniqueFilename);
        (0, fs_1.writeFileSync)(filePath, file.buffer);
        const attachment = await this.prisma.attachment.create({
            data: {
                filename: file.originalname,
                url: filePath,
                fileType: file.mimetype,
                fileSize: file.size,
                ticketId: ticketId,
                uploadedById: uploaderId,
                organizationId: organizationId,
            },
        });
        return attachment;
    }
    async getFile(attachmentId, organizationId) {
        const attachment = await this.prisma.attachment.findUnique({
            where: { id: attachmentId },
        });
        if (!attachment || attachment.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Attachment not found');
        }
        if (!(0, fs_1.existsSync)(attachment.url)) {
            throw new common_1.NotFoundException('File not found on server');
        }
        const file = (0, fs_1.createReadStream)(attachment.url);
        return {
            file: new common_1.StreamableFile(file),
            filename: attachment.filename,
            mimeType: attachment.fileType,
        };
    }
    async findByTicket(ticketId, organizationId) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
        });
        if (!ticket || ticket.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Ticket not found');
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
};
exports.AttachmentsService = AttachmentsService;
exports.AttachmentsService = AttachmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttachmentsService);
//# sourceMappingURL=attachments.service.js.map