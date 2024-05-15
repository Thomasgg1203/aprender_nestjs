import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './model/courses.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';

interface ModelExt<T> extends Model<T> {//funcion para elaborar el eliminado logico
  delete: Function,
  findAllCourses: Function
}

@Injectable()
export class CoursesService {
  //Esta parte es la encargada de trabajar con la base de datos
  constructor(@InjectModel(Course.name) private courseModel: ModelExt<Course>,
  //Injeccion de datos por parte del modelo del schema.
  @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const user = this.userModel.find();
    return this.courseModel.create(createCourseDto);
  }

  async findAll() {//Funcion para retornar todo el apartado de los cursos
    return await this.courseModel.findAllCourses();
  }

  async findOne(id: string) {//uso por el momento del operador any
      return this.courseModel.aggregate([
        {
          $match: {
            id: id
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'idAuthor',
            foreignField: 'id',
            as: 'author'
          }
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0,
            id: 1,
            name: 1,
            price: 1,
            description: 1,
            cover: 1,
            author: {
              name: 1,
              email: 1,
              avatar: 1
            }
          }
        }
      ]);    
  }

  //Actualizar sistema de forma que traiga y actualice los datos. 
  async update(id: string, updateCourseDto: UpdateCourseDto) {//para actualizar los datos
    // const curse = this.courseModel.findById({ _id: id }).exec();
    return await this.courseModel.findOneAndUpdate({id}, updateCourseDto, {
      upsert: true, //Esta parte es para que haga la insercion de datos.
      new: true //Si esto no llega a existir lo va crear
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id)//Tomando el id
    const response = this.courseModel.delete({_id})//solamente se implementa esta logica
    return response;//Dice que lo borra, pero solo es el borrado logico del sistema
  }
}
