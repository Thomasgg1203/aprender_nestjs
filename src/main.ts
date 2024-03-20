import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
//libreria para agregado de la documentacion de "SWAGGER".
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    { cors:true }
    );
    //Este es el limite del pilot
    app.use(json({ limit: '60mb' }));

    //vesionamiento de los enpoints por 1, por 2... etc
    //cuando se maneja de manera de consumo en la url
    app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });

    //

  const config = new DocumentBuilder()
    //toda esta documentación va ser uso de autenticacion
    .addBearerAuth()
    //Esta es la parte de la documentación del backend API
    .setTitle('Documentacion API NestJS Curso')
    .setDescription("Esta es la api del curso de NestJs thomasgg1203@gmail.com")
    .addTag('courses')//Parte titulo, para generar documentación en las variables de las clases
    .addTag('videos')
    .addTag('awards')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  console.log('___ENV___', process.env.PORT);
  app.setGlobalPrefix('api'); //Parte para volver en el enrutamiento global /api

  //esto para validar toda la aplicación de manera global
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
