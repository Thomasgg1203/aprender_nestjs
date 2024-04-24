import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/model/user.schema';

@Module({})
export class EventMailModule {
    @OnEvent('user.loguin')//Este es el evento que escucha cuando se crea un usuario
    handleUserLoguinCreatedEvent(user: UserDocument) {
        console.log('_____Inicio sesion_____', user)
        //Aqui ya se puede enviar un email.
    }


    @OnEvent('user.created')//Este es el evento que escucha cuando se crea un usuario
    handleUserCreatedEvent(user: UserDocument) {
        console.log('_____Event_User_____', user)
        //Aqui ya se puede enviar un email.
    }
}
