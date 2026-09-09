import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { User, UserDocument } from './schemas/user.schema.js';
import { QR_GENERATOR_TOKEN, type QRGenerator } from '../qr/qr.interface.js';

@Injectable()
export class UsersService {
    public constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject(QR_GENERATOR_TOKEN) private readonly qrGenerator: QRGenerator
    ) { }

    public async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.userModel.create(createUserDto);
    }

    public async findAll(): Promise<UserDocument[]> {
        return await this.userModel.find()
    }

    public async findOne(userId: string): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException(`the user with id ${userId} not found`)
        }

        return user;
    }

    public async generateAccessQR(user: UserDocument): Promise<Buffer<ArrayBufferLike>> {
        const generatedQR = await this.qrGenerator.generateQR(user);
        return generatedQR;
    }

}