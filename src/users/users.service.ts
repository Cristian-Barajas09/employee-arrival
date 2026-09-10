import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { User, UserDocument } from './schemas/user.schema.js';
import { QR_GENERATOR_TOKEN, type QRGenerator } from '../qr/qr.interface.js';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface.js';

type GenerateUserQR =  Buffer<ArrayBufferLike>;


@Injectable()
export class UsersService {
    public constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject(QR_GENERATOR_TOKEN) private readonly qrGenerator: QRGenerator,
        private readonly jwtService: JwtService
    ) { }

    public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create(createUserDto);
    }

    public async findAll(): Promise<UserDocument[]> {
        return await this.userModel.find()
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

    public async generateAccessQR(user: UserDocument): Promise<GenerateUserQR> {

        const payload: JwtPayload = {
            id: user.id
        }
        const EXPIRES_IN = '5m'

        const accessToken = this.jwtService.sign(payload, { expiresIn: EXPIRES_IN });

        const generatedQR = await this.qrGenerator.generateQR({
            token: accessToken,
            expiresIn: EXPIRES_IN
        });

        return generatedQR;
    }

}