import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResultExceptionDto } from '../result/result-exception.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard() {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException(new ResultExceptionDto('Não autorizado', null));
    }
    return user;
  }
}