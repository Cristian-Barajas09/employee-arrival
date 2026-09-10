export const ENCRYPT_PASSWORD_TOKEN = "ENCRYPT_PASSWORD_TOKEN";

export interface EncryptPasswordAdapter {
    encrypt(password: string): Promise<string>;
    compare(password: string, hashPassword: string): Promise<boolean>;
}