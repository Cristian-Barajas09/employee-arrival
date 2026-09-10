import { UserDocument, UserRole } from '../schemas/user.schema.js';

export class UserResponseDto {
    public id: string;
    public firstName: string;
    public lastName: string;
    public rol: UserRole;
    public dni: string;

    public static fromDocument(user: UserDocument): UserResponseDto {
        const response = new UserResponseDto();

        response.id = user.id;
        response.firstName = user.firstName;
        response.lastName = user.lastName;
        response.rol = user.rol;
        response.dni = user.dni;

        return response;
    }
}