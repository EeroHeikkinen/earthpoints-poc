import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (
      user &&
      user.userid.toString() === '00000000-0000-0000-0000-000000000000'
    ) {
      return true;
    }
    return false;
  }
}
