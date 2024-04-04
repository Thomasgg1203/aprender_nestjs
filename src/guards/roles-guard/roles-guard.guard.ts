import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuardGuard implements CanActivate {

  // constructor(private rol:string){ }
  constructor(
    private readonly reflector:Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    //Esta parte toma el apartado de los permisos de data, para generar
    const getRolMeta = this.reflector.get<string[]>('rol', context.getHandler())
    // console.log("========== METADATA ==========", getRolMeta)

    const req = context.getArgByIndex(0)
    const { roles } = req.user;
    // console.log('__________ROLES_________', roles);

    // const isAllow = roles.includes(this.rol)
    const isAllow = roles.some((roles) => getRolMeta.includes(roles))
    return isAllow;
    // return true;
  }
}
