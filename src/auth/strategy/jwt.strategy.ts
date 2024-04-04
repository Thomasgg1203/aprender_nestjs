import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel:Model<UserDocument>
  ) {
    super({
        //esta va venir atraves de un request(uso http)
        //Extrae el token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //aqui es para ignorar la expiracion del token
      ignoreExpiration: false,
      //y la llave secreta
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {id:string}) {
    const user = await this.userModel.findById( payload.id )
    return user;
    // return { userId: payload.id };
  }
}