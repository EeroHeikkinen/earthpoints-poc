import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';

import * as dotenv from "dotenv";
import { User } from 'src/user/entities/user.entity';

dotenv.config();

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    });
  }

  async validate(
    token: string,
    tokenSecret: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    
    const user:User = {
      userid: 'unimplemented',
      firstName: 'unimplemented'
    };

    done(null, user);
  }
}