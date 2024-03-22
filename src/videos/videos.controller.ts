import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  Logger,
  UploadedFile
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
//Libreria para la parte de agregado por categorización de las API
import { ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utils/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handle';

@ApiTags('videos')
@UseInterceptors(LoggerInterceptor)// Practicamente es para decirle que intercepte todo lo de este controlador
@Controller('videos')
@UsePipes(new ValidationPipe())//parte para tomar la validación del "DTO"
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @Post() //cuando se envia información, se establece la relación
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto)
    return this.videosService.create(createVideoDto);
  }

  @Get() //Todo http://localhost:3000/videos?id=1&descripcion=holamundo
  //El query puede tomar toda la url o tambien puede coger datos especificos
  findAll(@Query('id') id: string) {
    // console.log(query)
    return this.videosService.findAll();
  }

  @Get(':id')//ese parametro es el equivalente a "http://localhost:5173/videos/video-1"
  findOne(@Param('id') id: string) {
    console.log("Que tengo aqui bro?", id)
    return this.videosService.findOne(+id);
  }

  @Patch(':id')//Esto para actualizar todo un cuerpo mediante el id
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')//este si es par eliminar del sistema
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }

  //Metodo envio de datos file
  @Post('upload') //http://localhost:3000/v1/videos/upload
  @UseInterceptors(FileInterceptor('avatar', {storage}))
  handleUpload(@UploadedFile() file:Express.Multer.File) {
    console.log(file);
  }
}
