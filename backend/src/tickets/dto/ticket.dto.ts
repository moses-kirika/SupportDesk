import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketPriority, TicketStatus } from '@prisma/client';

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsEnum(TicketPriority)
    @IsOptional()
    priority?: TicketPriority;
}

export class UpdateTicketDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsEnum(TicketPriority)
    @IsOptional()
    priority?: TicketPriority;

    @IsEnum(TicketStatus)
    @IsOptional()
    status?: TicketStatus;
}
