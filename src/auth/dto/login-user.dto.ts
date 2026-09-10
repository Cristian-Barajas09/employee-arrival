import { IsEmail, IsNotEmpty, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class LoginUserDTO {


    @IsString()
    @IsNotEmpty()
    public dni: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    public password: string;
}