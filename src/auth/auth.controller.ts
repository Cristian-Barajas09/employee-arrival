
import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Res, StreamableFile } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { CreateUserDto } from "../users/dto/create-user.dto.js";
import { LoginUserDTO } from "./dto/login-user.dto.js";

import { GetUser } from "./decorators/get-user.decorator.js";
import { type UserDocument, UserRole } from "../users/schemas/user.schema.js";

import { Auth } from "./decorators/auth.decorator.js";
import { type Response } from "express";


@Controller('auth')
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
    ) {}


    @Post('register')
    public register(
        @Body()
        createUserDTO: CreateUserDto
    ) {

        return this.authService.register(createUserDTO)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public loginUser(
        @Body() loginUserDTO: LoginUserDTO
    ) {
        return this.authService.login(loginUserDTO)
    }


    @Get('check-auth-status')
    @Auth()
    public checkAuthStatus(
        @GetUser() user: UserDocument
    ) {
        return this.authService.checkAuthStatus(user);
    }


    @Post("generate/qr")
    @Auth()
    public async generateQR(
        @GetUser() user: UserDocument,
        @Res({ passthrough: true }) response: Response
    ) {

        const generatedAccess = await this.authService.generateAccessQR(user);

        response.set({
            'Content-Type': 'image/png',
        });


        return new StreamableFile(generatedAccess);
    }
}