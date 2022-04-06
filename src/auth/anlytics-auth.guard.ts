import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      if(request && request.query && request.query.secret && request.query.secret === process.env.ANALYTICS_SECRET)
        return true;
      return false;
    }
}
