import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

/**
 * Esto es propio de typeScript, es por eso que se coloca
 * en este apartado
 */
export type CourseDocument = Course & Document;
@Schema()
export class Course {
  @Prop()
  name: string;

  @Prop()
  price: number;

  // @Prop()
  // idAuthor: mongoose.Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
