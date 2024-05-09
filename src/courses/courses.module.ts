import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './model/courses.schema';
import { User, UserSchema } from 'src/users/model/user.schema';

@Module({
  //Parte de la importacion del schema del objeto
  imports: [
    MongooseModule.forFeature([
      {name:User.name, schema: UserSchema}
    ]),
    MongooseModule.forFeatureAsync([{//forma para implementar el pluguin delete de manera 
          name:Course.name,          //para un solo schema
          useFactory: () => {
            const schema = CourseSchema
            const pluguinOption = { overrideMethods: 'all' }
            schema.plugin(require('mongoose-delete'), pluguinOption)
            return schema;
          }
    }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
