import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { QrModule } from './qr/qr.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/application.config.js';
import { validationSchema } from './config/zod.config.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const user = config.getOrThrow<string>("database.user");
        const password = config.getOrThrow<string>("database.password");
        const host = config.getOrThrow<string>("database.host");
        const port = config.getOrThrow<number>("database.port");
        const database = config.getOrThrow<string>("database.dbName");



        return {
            uri: `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}?authSource=admin`
          }
      },
    }),
    UsersModule,
    QrModule,
    AuthModule
  ],
})
export class AppModule {}
