import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class UserEditBadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.redirect(`/user-edit?msg=${exception.message}`);
  }
}