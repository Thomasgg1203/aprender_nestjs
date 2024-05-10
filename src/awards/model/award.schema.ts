import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from "uuid";
import mongoose, { Document } from 'mongoose';

export type awardDocument = award & Document;

@Schema({ timestamps: true })
export class award {

  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  title: string;

  @Prop()
  idUser: mongoose.Types.ObjectId;

  @Prop()
  description: string;
}

export const awardSchema = SchemaFactory.createForClass(award);
