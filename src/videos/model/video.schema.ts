import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from "uuid";
import mongoose, { Document } from 'mongoose';

export type UserDocument = video & Document;

@Schema({ timestamps: true })
export class video {

  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  title: string;

  @Prop()
  idCourse: mongoose.Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  source: string;

  @Prop()
  score: number;
}

export const videoSchema = SchemaFactory.createForClass(video);
