
export const QR_GENERATOR_TOKEN = "QR_GENERATOR_TOKEN";

export interface QRGenerator {
    /**
     * 
     * @param metadata the data encoded in qr
     */
    generateQR(metadata: any): Promise<Buffer<ArrayBufferLike>>;
}

