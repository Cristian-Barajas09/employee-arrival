import { Injectable } from "@nestjs/common";
import { EncryptPasswordAdapter } from "../interfaces/encrypt-password.interface.js";

import * as bcrypt from "bcrypt";


@Injectable()
export class BcryptAdapter implements EncryptPasswordAdapter {
    public async encrypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)

        const hash = await bcrypt.hash(password, salt)

        return hash;

    }

    public async compare(password: string, hashPassword: string): Promise<boolean> {

        return await bcrypt.compare(password, hashPassword);
    }

}