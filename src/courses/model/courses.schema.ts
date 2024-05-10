import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from "uuid";
import mongoose, { Document } from 'mongoose';

/**
 * Esto es propio de typeScript, es por eso que se coloca
 * en este apartado
 */
export type CourseDocument = Course & Document;
@Schema()
export class Course {

  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({required: true})
  idAuthor: string;

  @Prop()
  description: string;

  @Prop()
  cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
