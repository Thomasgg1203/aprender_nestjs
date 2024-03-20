import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('courses')//Agregacion para la parte visual "http://localhost:doc"
@ApiBearerAuth()//Apartado para colocar autorización con token
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  // @ApiBearerAuth()Si solo se quiere uno, se coloca aquí
  @HttpCode(201)//Parte entrega del codigo al momento de gestionar el cors
  create(@Body() create: CreateCourseDto) {
    //Parte de excepciones de codigos http
    const {price} = create;//sacar o destruir las excepciones para el uso de actividades(no es recomendable en el controlador, pero aun asi el ejemplo)
    //Validacion por las dos partes, por si se quiere manejar todo el entorno manual, pero si se usa otra cosa, y no concuerda, el usara la libreria que tiene por defecto
    // if(price === 999) throw new HttpException('El precio es demasiado alto', 401);
    if(price === 999) throw new HttpException('El precio es demasiado alto', HttpStatus.FORBIDDEN);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
