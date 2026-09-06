import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { QrModule } from './qr/qr.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/application.config.js';
import { validationSchema } from './config/zod.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema,
    }),
    UsersModule,
    QrModule,
    AuthModule
  ],
})
export class AppModule {}
