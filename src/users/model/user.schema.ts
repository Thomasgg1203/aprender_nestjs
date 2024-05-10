import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from "uuid";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  //TODO _id
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: ['user']
  })
  roles: string[];

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  description: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
