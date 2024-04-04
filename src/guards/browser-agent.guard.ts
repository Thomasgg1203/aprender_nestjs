import { 
  CanActivate, 
  ExecutionContext, 
  HttpException, 
  HttpStatus, 
  Injectable 
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserAgentGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const req = context.getArgByIndex(0);
    // const userAgent = req.headers['user-agent'];
    // const isAllowed = (userAgent === 'google/chrome')

    // if(!isAllowed) throw new HttpException('BROWSER_AGENT_INVALID', HttpStatus.BAD_REQUEST);

    return true;

    // if(userAgent !== 'google/chrome'){
    //   return false;
    // }
    // console.log('_____', userAgent);//_____ Thunder Client (https://www.thunderclient.com)
    // return true; //Esto viene por defecto en TRUE
  }
}
