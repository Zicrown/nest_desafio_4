import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators';
import { Rol } from 'src/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiedRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiedRoles) return true;
    const { usuario } = context.switchToHttp().getRequest();
    const rolUsuario = requiedRoles.some((rol) => usuario.roles?.includes(rol));
    if (!rolUsuario)
      throw new HttpException(
        'No tiene las Credenciales necesarias',
        HttpStatus.FORBIDDEN,
      );
    return rolUsuario;
  }
}
