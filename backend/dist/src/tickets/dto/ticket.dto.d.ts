import { TicketPriority, TicketStatus } from '@prisma/client';
export declare class CreateTicketDto {
    title: string;
    description: string;
    category: string;
    priority?: TicketPriority;
}
export declare class UpdateTicketDto {
    title?: string;
    description?: string;
    category?: string;
    priority?: TicketPriority;
    status?: TicketStatus;
}
