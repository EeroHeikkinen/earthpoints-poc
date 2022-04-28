import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class UserEditBadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const expResp = exception.getResponse();
    let msg = exception.message;
    if(typeof expResp === 'object'){
      if('message' in expResp){
        if(typeof expResp['message'] === 'string')
          msg = expResp['message'];
        else if(typeof expResp['message'] === 'object')
          msg = expResp['message'].join(',');
      }
    }

    response.redirect(`/user-edit?msg=${msg}`);
  }
}