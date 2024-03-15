import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//libreria para agregado de la documentacion de "SWAGGER".
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    //toda esta documentación va ser uso de autenticacion
    .addBearerAuth()
    .setTitle('Documentacion API NestJS Curso')
    .setDescription("Esta es la api del curso de NestJs thomasgg1203@gmail.com")
    .addTag('courses')//Parte titulo, para generar documentación en las variables de las clases
    .addTag('videos')
    .addTag('awards')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  //esto para validar toda la aplicación de manera global
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
