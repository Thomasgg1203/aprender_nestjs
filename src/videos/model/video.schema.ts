import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = video & Document;

@Schema({ timestamps: true })
export class video {
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
