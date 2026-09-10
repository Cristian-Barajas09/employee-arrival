import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterArrivalDto {
    @IsString()
    @IsNotEmpty()
    public token: string;
}