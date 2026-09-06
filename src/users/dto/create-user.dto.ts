import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../schemas/user.schema.js';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    rol: UserRole;

    @IsString()
    @IsNotEmpty()
    dni: string;
}