import { IsEmail, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class LoginUserDTO {


    @IsString()
    @Min(5)
    @Max(11)
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