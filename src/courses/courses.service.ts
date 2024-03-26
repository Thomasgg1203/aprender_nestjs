import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './model/courses.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  //Esta parte es la encargada de trabajar con la base de datos
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {

  }

  create(createCourseDto: CreateCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: any) {//uso por el momento del operador any
    return `This action returns a #${id} course`;
  }
  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
