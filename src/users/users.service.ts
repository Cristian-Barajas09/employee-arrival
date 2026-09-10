import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { User, UserDocument } from './schemas/user.schema.js';
import { UserArrival, UserArrivalDocument } from './schemas/user-arrival.schema.js';
import { UserArrivalResponseDto } from './dto/user-arrival-response.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';



@Injectable()
export class UsersService {
    public constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(UserArrival.name) private readonly userArrivalModel: Model<UserArrival>,
    ) { }

    public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create(createUserDto);
    }

    public async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userModel.find();

        return users.map(UserResponseDto.fromDocument);
    }

    public async findOneById(userId: string): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException(`the user with id ${userId} not found`)
        }

        return user;
    }

    public async findOneByDNI(dni: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ dni });

        if (!user) {
            throw new NotFoundException(`the user with dni ${dni} not found`)
        }

        return user;
    }

    public async registerArrival(user: UserDocument): Promise<UserArrivalResponseDto> {
        const arrival = await this.userArrivalModel.create({ user: user._id });
        const populatedArrival = await arrival.populate<{ user: UserDocument }>('user');

        return UserArrivalResponseDto.fromDocument(populatedArrival);
    }

    public async findArrivals(): Promise<UserArrivalResponseDto[]> {
        const arrivals = await this.userArrivalModel
            .find()
            .populate<{ user: UserDocument }>({ path: 'user', select: '-password' })
            .sort({ arrivalDate: -1 });

        return arrivals.map(UserArrivalResponseDto.fromDocument);
    }

    

}