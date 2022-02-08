import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from "express";
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
        let data = request?.cookies["auth-cookie"];
        if(!data){
            return null;
        }
        //const user = userService.findByUserId(data.userid)
        return data.access_token
    }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log("finding user with id " + payload.userid)
    const user = await this.userService.findByUserId(payload.userid);
    console.log("returning user " + JSON.stringify(user))
    return user;
  }
}