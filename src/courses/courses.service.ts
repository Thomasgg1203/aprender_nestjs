import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './model/courses.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';

interface ModelExt<T> extends Model<T> {//funcion para elaborar el eliminado logico
  delete: Function
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
    //Toda esta coleccion se esta trabajando en los cursos.
    const list = this.courseModel.aggregate([
      {
        $lookup:{//metodo lookup, permite consultar.
          from: 'users', // Nombre de la colección secundaria
          foreignField: 'id', // Campo en la colección secundaria para la unión
          localField: 'idAuthor', // Campo en la colección principal para la unión
          as: 'author', // Alias para los resultados de la unión
          pipeline: [//Aqui esta actuando sobre la coleccion de users
            {
              $project: {
                _id: 0,
                name: 1,
                email: 1,
                avatar: 1,
              }
            }
          ],
        },
      },
      {
        $unionWith: '$author',
      },
    ])

    // const list = await this.courseModel.find({});
    // return list;
  }

  findOne(id: any) {//uso por el momento del operador any
    return `This action returns a #${id} course`;
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {//para actualizar los datos
    // const curse = this.courseModel.findById({ _id: id }).exec();
    return `This action updates a #${id} course`;
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id)//Tomando el id
    const response = this.courseModel.delete({_id})//solamente se implementa esta logica
    return response;//Dice que lo borra, pero solo es el borrado logico del sistema
  }
}
