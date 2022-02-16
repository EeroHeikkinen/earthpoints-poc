import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-instagram-strategy';

import * as dotenv from "dotenv";
import { User } from 'src/user/entities/user.entity';
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { UserService } from 'src/user/user.service';

dotenv.config();

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy, 'instagram') {
  constructor(private socialCredentialService: SocialCredentialService,
    private userService: UserService) {
    
    super({
      clientId: process.env.INSTAGRAM_APP_ID,
      clientSecret: process.env.INSTAGRAM_APP_SECRET,
      callbackUrl: process.env.INSTAGRAM_CALLBACK_URL,
      passReqToCallback: true
    });
  }
  //

  async validate(
    req: any,
    token: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { id, username } = profile;

    let userid: string;

    if(req.user) {
      /* User already logged in via JWT cookie: we are adding an additional social profile */
      userid = req.user.userid;

      await this.socialCredentialService.create({
        userid,
        profile_id: id,
        platform: 'instagram',
        auth_token: token,
        auth_expiration: undefined
      })
    }
    else {
      let credentials = await this.socialCredentialService.findByProfileIdAndPlatform(id, 'instagram');
      
      if(!credentials.length) {
        // First login for user
        const Uuid = require('cassandra-driver').types.Uuid;
        userid = Uuid.random().toString();

        const newUser = await this.userService.create({
          userid,
          firstName: username
        });

        credentials = await this.socialCredentialService.create({
          userid,
          profile_id: id,
          platform: 'instagram',
          auth_token: token,
          auth_expiration: undefined
        })
      } else {
        userid = credentials[0].userid;
        
        // Update new access token (to all tables)
        credentials = await this.socialCredentialService.update({
          userid,
          profile_id: id,
          platform: 'instagram',
          auth_token: token,
          auth_expiration: undefined
        })
      }
    }

    const user:User = {
      userid,
      firstName: username
    };

    done(null, user);
  }
}