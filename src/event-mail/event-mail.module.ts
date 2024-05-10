import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailModule } from 'src/mail/mail.module';
import { UserDocument } from 'src/users/model/user.schema';

@Module({})
export class EventMailModule {

    //Evento para decir que envie el correo electronico
    constructor(private readonly mailServices: MailModule){

    }

    @OnEvent('user.loguin')//Este es el evento que escucha cuando se crea un usuario
    handleUserLoguinCreatedEvent(user: UserDocument) {
        console.log('_____Inicio sesion_____', user)
        //Aqui ya se puede enviar un email.
    }

    @OnEvent('user.created')//Este es el evento que escucha cuando se crea un usuario
    handleUserCreatedEvent(user: UserDocument) {
        console.log('_____Event_User_____', user)
        // //Aqui ya se puede enviar un email.
        this.mailServices.sendMail({
            to: user.email,//Envio del email
            subject: 'Bienvenido',
            template: 'welcome',
            // bcc: 'no' //aqui se podria hacer una copia de los datos que se envia.
            context: {//Este es el contexto del creador, para enviar
                name: user.name
            },
            // attachments: [] //Algo adjunto, como un archivo
        });
    }
}
