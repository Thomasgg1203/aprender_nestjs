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
/**
 * 
 * Este sistema no funciona apropiadamente, hecharle un ojo.
 */

// // //Toda esta coleccion se esta trabajando en los cursos.
CourseSchema.statics.findAllCourses = function(){
  const list = this.aggregate([
    {
      $match: {
        deleted: false
      }
    },
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
      $unwind: {
        path: '$author',
        preserveNullAndEmptyArrays: true
      }
    },
  ]
)
  return list; 
}

// CourseSchema.statics.findAllCourses = function(){
//   return this.aggregate([
//     {
//       $lookup: {
//         from: 'users',
//         localField: 'idAuthor',
//         foreignField: 'id',
//         as: 'author'
//       }
//     },
//     {
//       $unwind: {
//         path: "$author",
//         preserveNullAndEmptyArrays: true
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         id: 1,
//         name: 1,
//         price: 1,
//         description: 1,
//         cover: 1,
//         'author.name': 1,
//         'author.email': 1,
//         'author.avatar': 1
//       }
//     }
//   ]);
// }


