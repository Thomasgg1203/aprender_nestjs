import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  // HttpException,
  // HttpStatus,
  // ParseArrayPipe,
  // ParseIntPipe
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SlugPipe } from './pipes/slug.pipe';

@ApiTags('courses') //Agregacion para la parte visual "http://localhost:doc".
@ApiBearerAuth() //Apartado para colocar autorización con token en la documentación del sistema OEE.
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // @Post()
  // // @ApiBearerAuth()Si solo se quiere uno, se coloca aquí
  // @HttpCode(201)//Parte entrega del codigo al momento de gestionar el cors
  // create(@Body() create: CreateCourseDto) {
  //   //Parte de excepciones de codigos http
  //   const {price} = create;//sacar o destruir las excepciones para el uso de actividades(no es recomendable en el controlador, pero aun asi el ejemplo)
  //   //Validacion por las dos partes, por si se quiere manejar todo el entorno manual, pero si se usa otra cosa, y no concuerda, el usara la libreria que tiene por defecto
  //   // if(price === 999) throw new HttpException('El precio es demasiado alto', 401);
  //   if(price === 999) throw new HttpException('El precio es demasiado alto', HttpStatus.FORBIDDEN);
  // }
  @Post()
  @HttpCode(201)
  create(@Body() CreateCourseDto: CreateCourseDto) {
    return this.coursesService.create(CreateCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  // //Consular cada curso del sistema.
  // @Get(':id') //El PARSEINTPIPE (para validar que no ingrese otros datos al sistema)
  // findOne(@Param('id', ParseIntPipe) id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  // //excepciones con Not_acceptable.
  // @Get(':id') //Parte del parceo con ejemplo de excepcion con http
  // findOne(@Param('id', new ParseIntPipe({
  //    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  //   }))
  //   id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  //excepciones con la libreria o decorador PIPES
  //Uso de la libreria SlugPipe con llamado en otra carpeta, para la transformacion de url
  @Get(':title')
  findOne(@Param('title', new SlugPipe()) title: string) {
    console.log('_____TITLE_____', title);
    return this.coursesService.findOne(+title);
  }

  //Metodo de actualizacion
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
