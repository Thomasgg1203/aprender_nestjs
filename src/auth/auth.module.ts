import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/model/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    // JwtModule.register({
    //   global: true,
    //   // en la opción de las firmas, haremos que estas expiren en 4 dias
    //   signOptions: { expiresIn: '4d' },
    //   // el secretKey, se define como una constante que solo sabremos de lado del BackEnd, ya sea aquí o en el .env
    //   secret: process.env.JWT_SECRET,
    // }),
    //Forma asycrona, para que cargue el .env
    JwtModule.registerAsync({
      useFactory:() => {
        // console.log('________________________', process.env.JWT_SECRET);
        return {
              // en la opción de las firmas, haremos que estas expiren en 4 dias
              signOptions: { expiresIn: '4d' },
              // el secretKey, se define como una constante que solo sabremos de lado del BackEnd, ya sea aquí o en el .env
              secret: process.env.JWT_SECRET,
        }
      }
    }),
    MongooseModule.forFeature([
      {name:User.name, schema: UserSchema},
  ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
