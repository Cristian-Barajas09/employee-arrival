import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';
import { UserArrival, UserArrivalSchema } from './schemas/user-arrival.schema.js';
import { UsersService } from './users.service.js';
import { QrModule } from '../qr/qr.module.js';
import { UsersController } from './users.controller.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserArrival.name, schema: UserArrivalSchema },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
