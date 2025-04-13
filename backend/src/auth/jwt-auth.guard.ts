import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException('Отсутствует заголовок авторизации');
    }
    
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Неверный формат токена авторизации');
    }
    
    try {
      this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException(`Ошибка аутентификации: ${error.message}`);
    }
    
    return super.canActivate(context);
  }
  
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Ошибка аутентификации: ' + (info?.message || 'Неизвестная ошибка'));
    }
    return user;
  }
}
