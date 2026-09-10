import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CreateUserDto } from "../users/dto/create-user.dto.js";
import { ENCRYPT_PASSWORD_TOKEN, type EncryptPasswordAdapter } from "../common/interfaces/encrypt-password.interface.js";
import { LoginUserDTO } from "./dto/login-user.dto.js";
import { UsersService } from "../users/users.service.js";
import { JwtPayload } from "./interfaces/jwt-payload.interface.js";
import { type UserDocument } from "../users/schemas/user.schema.js";
import { QR_GENERATOR_TOKEN, type QRGenerator } from "../qr/qr.interface.js";


type GenerateUserQR =  Buffer<ArrayBufferLike>;


enum AccessType {
    PHYSICAL_ACCESS = "PHYSICAL_ACCESS"
}
@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthService')

    public constructor(
        private readonly userService: UsersService,

        @Inject(ENCRYPT_PASSWORD_TOKEN)
        private readonly encryptPassword: EncryptPasswordAdapter,
        private readonly jwtService: JwtService,
        @Inject(QR_GENERATOR_TOKEN) private readonly qrGenerator: QRGenerator,

    ) { }

    public async register(createUserDTO: CreateUserDto) {
        try {

            createUserDTO.password = await this.encryptPassword.encrypt(createUserDTO.password);


            const { password: _password, ...user } = await this.userService.create(createUserDTO)

            return {
                user,
                token: this.getJwtToken({id: user.id})
            };


        } catch (err) {
            this.handleDBExceptions(err)
        }
    }

    public async login(loginUserDTO: LoginUserDTO) {
        const { password, dni } = loginUserDTO

        const user = await this.userService.findOneByDNI(dni);

        if (!user) {
            throw new UnauthorizedException('Not valid credentials')
        }

        const isValidPassword = await this.encryptPassword.compare(password, user.password)

        if (!isValidPassword) {
            throw new UnauthorizedException('Not valid credentials')
        }

        const { password: _password, ...userWithoutPassword } = user

        return {
            user: userWithoutPassword,
            token: this.getJwtToken({ id: user.id})
        };
    }

    public async generateAccessQR(user: UserDocument): Promise<GenerateUserQR> {

        const payload: JwtPayload = {
            id: user.id,
            accessType: AccessType.PHYSICAL_ACCESS,
        }
        const EXPIRES_IN = '5m'

        const accessToken = this.jwtService.sign(payload, { expiresIn: EXPIRES_IN });

        const generatedQR = await this.qrGenerator.generateQR({
            token: accessToken,
            expiresIn: EXPIRES_IN,
            accessType: AccessType.PHYSICAL_ACCESS
        });

        return generatedQR;
    }

    public async validateAccessToken(token: string): Promise<UserDocument> {
        let payload: JwtPayload;

        try {
            payload = await this.jwtService.verifyAsync<JwtPayload>(token);
        } catch {
            throw new UnauthorizedException('Token not valid');
        }

        if (!payload.id || payload.accessType !== AccessType.PHYSICAL_ACCESS) {
            throw new UnauthorizedException('Token not valid');
        }

        return this.userService.findOneById(payload.id);
    }

    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign( payload );

        return token
    }

    public checkAuthStatus(user: UserDocument) {
        return {
            user,
            token: this.getJwtToken({ id: user.id })
        }
    }

    private handleDBExceptions(error: any): never {
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }



        this.logger.error(error)
        throw new InternalServerErrorException("Unexpected error, check logs")
    }

}