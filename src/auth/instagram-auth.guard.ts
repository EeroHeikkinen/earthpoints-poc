import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import querystring from 'querystring';

import * as dotenv from "dotenv";
import { response } from 'express';
dotenv.config();

@Injectable()
export class InstagramAuthGuard extends AuthGuard('instagram') {
  constructor(private reflector: Reflector) {
    super({});
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const options:any = {
      scope: ['user_profile','user_media']
    }
    const callbackURLs = this.reflector.get<string[]>('callbackURL', context.getHandler());
    if(callbackURLs.length) {
      options.callbackURL = process.env.BASE_URL + callbackURLs[0]
    }
    return options
  }
}
