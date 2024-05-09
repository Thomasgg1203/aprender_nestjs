import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
    //Recordar el constructor para hacer la inyeccion a la base de datos
    constructor(
        //Parte de importacion para el token
        private readonly jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2,
        @InjectModel(User.name) private readonly userModel:Model<UserDocument>
    ) {}

    //Metodo para el login
    public async login(userLoginBody: LoginAuthDto){

        //Recolecta de datos para ver la encriptacion
        const { password } = userLoginBody;
        //Parte de buscado para validar si existe
        const userExist = await this.userModel.findOne({email: userLoginBody.email});
        // console.log(!isExist); //esto va enviar null o comparar
        if(!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        // de lo contrario creamos un objeto que, por medio del usuario validado nos permitira comparar el campo contrasenia
        // gracias a nuestro manejador de hashes, así podremos desencriptar y comparar
        const isCheck = await compareHash(password, userExist.password);
        if(!isCheck) throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);
        
        //Paso para eliminar los datos que se vayan enviar en rspuesta al ingreso
        const userFlat = userExist.toObject();
        delete userFlat.password;

        //Busqueda del id del usario
        const  payoad = {
            id:userFlat._id
        }

        //Generacion de token
        const token = this.jwtService.sign(payoad)


        const data = {//reConstrucción de envio de datos.
            token: token,
            user: userFlat
        }

        this.eventEmitter.emit('user.loguin', data);//Emite el mensaje

        //Devuelve la parte del usuario sin contraseña.
        return data;
    }

    //Metodo publico para resivir el registro
    public async register(userBody:RegisterAuthDto){
        //Antes de guardar los datos, se dispone de guardar una contraseña
        const { password, ...user } = userBody;
        const userParse = {
            ...user, password: await generateHash(password)
        }

        const newUser = await this.userModel.create(userParse);

        this.eventEmitter.emit('user.created', newUser);//Este es el envio de datos
          

        return newUser;
    }
}
