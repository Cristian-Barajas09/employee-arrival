import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../users/schemas/user.schema.js";
import { JwtPayload } from "../interfaces/jwt-payload.interface.js";
import { UsersService } from "../../users/users.service.js";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    public constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.getOrThrow<string>('jwt.accessToken'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    public async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload

        const user = await this.usersService.findOneById(id)

        if (!user || !id) {
            throw new UnauthorizedException('Token not valid')
        }


        return user;
    }


}