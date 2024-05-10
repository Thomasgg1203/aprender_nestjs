import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        // MailerModule.forRoot({
        //     transport: {
        //         host: process.env.MAIL_HOST,
        //         secure: process.env.MAIL_SECURE === 'true',
        //         port: process.env.MAIL_PORT,
        //         auth: {
        //             user: process.env.MAIL_USER,
        //             pass: process.env.MAIL_PASSWORD,
        //         },
        //     },
        //     defaults: {
        //         from: '"nest-modules" <modules@nestjs.com>',
        //     },
        //     template: {
        //         dir: __dirname + '/templates',
        //         adapter: new HandlebarsAdapter(),
        //         options: {
        //             strict: true,
        //         },
        //     },
        // }),
        /**
         * Uso del metodo asyncrono, para que carguen los datos del .env y se 
         * procese de manera que tenga los datos.
         */
        MailerModule.forRootAsync({
            useFactory: () => {
                console.log('---__///////////____', process.env.MAIL_HOST)
                return {
                    transport: {
                        host: process.env.MAIL_HOST,
                        secure: process.env.MAIL_SECURE === 'true',
                        port: process.env.MAIL_PORT,
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASSWORD,
                        },
                    },
                    defaults: {
                        from: `"nest-modules" <${process.env.MAIL_FROM}>`,
                    },
                    template: {
                        dir: __dirname + '/templates',
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }
            }
        }),
    ]
})
export class MailModule {
    [x: string]: any;
}
