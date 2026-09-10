import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema.js';

export type UserArrivalDocument = HydratedDocument<UserArrival>;

@Schema()
export class UserArrival {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId;

    @Prop({ required: true, default: Date.now })
    arrivalDate: Date;
}

export const UserArrivalSchema = SchemaFactory.createForClass(UserArrival);