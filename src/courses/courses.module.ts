import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './model/courses.schema';

@Module({
  //Parte de la importacion del schema del objeto
  imports: [
    MongooseModule.forFeature([
      {name:Course.name, schema: CourseSchema}
    ])
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
