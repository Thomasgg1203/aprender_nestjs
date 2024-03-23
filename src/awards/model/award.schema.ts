import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type awardDocument = award & Document;

@Schema({ timestamps: true })
export class award {
  @Prop()
  title: string;

  @Prop()
  idUser: mongoose.Types.ObjectId;

  @Prop()
  description: string;
}

export const awardSchema = SchemaFactory.createForClass(award);
