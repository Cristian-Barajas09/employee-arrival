import { Module } from '@nestjs/common';
import { QRCodeGenerator } from './qr.service.js';
import { QR_GENERATOR_TOKEN } from './qr.interface.js';

@Module({
    providers: [
        {
            useClass: QRCodeGenerator,
            provide: QR_GENERATOR_TOKEN
        }
    ],
    exports: [QR_GENERATOR_TOKEN]
})
export class QrModule {}
