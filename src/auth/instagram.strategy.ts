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
      // TODO setup https for this
      callbackUrl: 'https://localhost:3000/instagram/redirect',
      scope: ['user_profile','user_media'],
      scopeSeparator: ','
    });
  }
  //

  async validate(
    token: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { id, username } = profile;

    let credentials = await this.socialCredentialService.findByProfileIdAndPlatform(id, 'instagram');
    
    let userid: string;

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

    const user:User = {
      userid,
      firstName: username
    };

    done(null, user);
  }
}