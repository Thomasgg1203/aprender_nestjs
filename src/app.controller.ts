import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  // @ApiTags('auth')//Se pueden colocar los metodos para una sola ruta
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
