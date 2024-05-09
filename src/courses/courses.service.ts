import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './model/courses.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function
}

@Injectable()
export class CoursesService {
  //Esta parte es la encargada de trabajar con la base de datos
  constructor(@InjectModel(Course.name) private courseModel: ModelExt<Course>,
  @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const user = this.userModel.find();
    return this.courseModel.create(createCourseDto);
  }

  async findAll() {
    const list = await this.courseModel.find({});
    return list;
  }

  findOne(id: any) {//uso por el momento del operador any
    return `This action returns a #${id} course`;
  }
  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id)
    const response = this.courseModel.delete({_id})
    return response;
  }
}
