import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

import * as dotenv from "dotenv";
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

dotenv.config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private socialCredentialService: SocialCredentialService,
    private userService: UserService,
    private jwtStrategy: JwtStrategy
    ) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'https://localhost:3000/facebook/redirect',
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
    const { name, emails, id, displayName } = profile;

    // Do we have a cookie for dashboardUserId?
    // 


    let credentials = await this.socialCredentialService.findByProfileIdAndPlatform(id, 'facebook');
    
    let userid: string;

    if(!credentials.length) {
      // First login for user
      const Uuid = require('cassandra-driver').types.Uuid;
      userid = Uuid.random().toString();

      const newUser = await this.userService.create({
        userid,
        firstName: name.givenName
      });

      credentials = await this.socialCredentialService.create({
        userid,
        profile_id: id,
        platform: 'facebook',
        auth_token: accessToken,
        auth_expiration: undefined
      })
    } else {
      userid = credentials[0].userid;
      
      // Update new access token (to all tables)
      credentials = await this.socialCredentialService.update({
        userid,
        profile_id: id,
        platform: 'facebook',
        auth_token: accessToken,
        auth_expiration: undefined
      })
    }

    const user:User = {
      userid,
      firstName: name.givenName
    };

    done(null, user);
  }
}