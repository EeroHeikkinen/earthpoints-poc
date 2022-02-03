import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

import * as dotenv from "dotenv";
import { User } from 'src/interfaces/user.interface';

dotenv.config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://localhost:3000/facebook/redirect',
      scope: ['email', 
      'user_likes',
      'user_link',
      'user_photos',
      'user_posts',
      'user_videos',
      'pages_show_list'],
      profileFields: ['emails', 'name', ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, id } = profile;
    const user:User = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken: accessToken,
      facebookId: id
    };

    done(null, user);
  }
}