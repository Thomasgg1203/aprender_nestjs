import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
/**
 * Esto es para coger todos los datos que coge express o cualquier 
 */
@Injectable()
/**
 * -----ExecutionContext-----
 * El contexto, es digamos lo que se tiene como express o microservicios
 * quiere decir que se tiene en esta parte en cuanto a wecksokest o algo asi
 * Aqui se va obtener propiedades express(Resumidas cuentas)
 */
/**
 * -----Next------
 * El lo que ve que esta pasando por ahi, como el puede modificar, puede convertir, puede dejar continuar o detenerlo
 * 
 * Si todo el flujo sigue, es "next.handle()"
 */
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...', Object.keys(context)); //Before...  'args', 'constructorRef', 'handler', 'contextType' ]
    // console.log('Before...', context['contextType']) //Before... http
    // console.log('Before...', Object.keys(context.getArgs()))//Before... [ '0', '1', '2' ]
    // console.log('Before...', context.getArgs()[0])//Intercepta la capa interna de envio http-express
    const [req, res] = context.getArgs();
    console.log('Before...', req.host)//Intercepta que envia en la url
    return next.handle()
    .pipe(
      tap((value) => console.log('Respuesta.....', value))
    );
  }
}


