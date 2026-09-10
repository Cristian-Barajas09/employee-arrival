import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';
import { UsersService } from './users.service.js';
import { QrModule } from '../qr/qr.module.js';
import { UsersController } from './users.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        QrModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
