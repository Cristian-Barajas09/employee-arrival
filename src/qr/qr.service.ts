import { Injectable } from "@nestjs/common";
import { QRGenerator } from "./qr.interface.js";
import * as QRCode from "qrcode";

@Injectable()
export class QRCodeGenerator implements QRGenerator {
    public async generateQR(metadata: any): Promise<Buffer<ArrayBufferLike>> {
        const encodedMetadata = JSON.stringify(metadata);

        return await QRCode.toBuffer(encodedMetadata, {
            margin: 8,
            scale: 5,
            errorCorrectionLevel: 'M'
        })
    }
}