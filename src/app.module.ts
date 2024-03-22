import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { AwardsModule } from './awards/awards.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    //Password de la base de datos
    //-----------Th0mas123*------------
    //Modulo de la configuracion del .env <(Con su metodo estatico forRoot())>
    ConfigModule.forRoot({
      //Para que funcione en toda la aplicación
      isGlobal: true
    }),
    /*
    Uso del apartado de excepciones, si hay alguna url que no sea una
    funcion del sistema, se enviara al archivo public para empezar 
    ejecutar un archivo index.hmtl para proporcionar información de 
    contacto.
    */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    //Modulos de las demas entidades
    CoursesModule,
    AuthModule,
    VideosModule,
    AwardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
