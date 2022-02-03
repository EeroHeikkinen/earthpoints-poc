import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from "express";
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
        let data = request?.cookies["auth-cookie"];
        if(!data){
            return null;
        }
        return data.access_token
    }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { email: payload.email, facebookId: payload.facebookId, firstName: payload.firstName };
  }
}