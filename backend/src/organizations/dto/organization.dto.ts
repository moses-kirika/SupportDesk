import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateOrganizationDto {
    @IsString()
    @IsOptional()
    name?: string;
}

export class InviteUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;
}
