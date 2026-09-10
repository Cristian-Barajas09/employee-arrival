import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { CommonModule } from '../common/common.module.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy.js';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(config: ConfigService) {
                return {
                    secret: config.getOrThrow<string>('jwt.accessToken'),
                    signOptions: { expiresIn: '2h' },
                }
            },
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        CommonModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
