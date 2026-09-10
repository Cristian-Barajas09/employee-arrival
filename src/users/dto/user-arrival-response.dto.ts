import { UserDocument } from '../schemas/user.schema.js';
import { UserArrivalDocument } from '../schemas/user-arrival.schema.js';
import { UserResponseDto } from './user-response.dto.js';

export class UserArrivalResponseDto {
    public id: string;
    public arrivalDate: Date;
    public user: UserResponseDto;

    public static fromDocument(
        arrival: UserArrivalDocument & { user: UserDocument },
    ): UserArrivalResponseDto {
        const response = new UserArrivalResponseDto();

        response.id = arrival.id;
        response.arrivalDate = arrival.arrivalDate;
        response.user = UserResponseDto.fromDocument(arrival.user);

        return response;
    }
}