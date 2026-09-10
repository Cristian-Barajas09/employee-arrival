import { Module } from "@nestjs/common";
import { BcryptAdapter } from "./adapters/bcrypt.adapter.js";
import { ENCRYPT_PASSWORD_TOKEN } from "./interfaces/encrypt-password.interface.js";

@Module({
    providers: [
        {
            provide: ENCRYPT_PASSWORD_TOKEN,
            useClass: BcryptAdapter
        }
    ],
    exports: [ENCRYPT_PASSWORD_TOKEN]
})
export class CommonModule {}