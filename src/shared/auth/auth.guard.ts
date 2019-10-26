import { ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResultExceptionDto } from '../result/result-exception.dto';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard() {
  private roles: string[];

  canActivate(context: ExecutionContext) {
    this.roles = new Reflector().get<string[]>('roles', context.getHandler());
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    // Erro ou não tem token válido
    if (err || !user) {
      throw err || new UnauthorizedException(new ResultExceptionDto('Não autorizado', null));
    }

    // Token válido e não precisa de permissão específica.
    if (!this.roles) {
      return user;
    }

    const userRoles = user.roles;
    const hasRole = () =>
      userRoles.some((role: string) =>
        !!this.roles.find(item => item === role));

    // Por algum motivo não foi encontrado as permissões do usuário no Token. 
    if (!userRoles)
      throw new UnauthorizedException(new ResultExceptionDto('Não autorizado', null));

    // Usuário não tem a permissão definida na API.
    if (!hasRole())
      throw new ForbiddenException(new ResultExceptionDto('Não tem permissão', null));

    return user;
  }
}