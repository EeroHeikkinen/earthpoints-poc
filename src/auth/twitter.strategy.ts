import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';

import * as dotenv from "dotenv";
import { User } from 'src/user/entities/user.entity';
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { UserService } from 'src/user/user.service';

dotenv.config();

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private socialCredentialService: SocialCredentialService,
    private userService: UserService) {
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
    const { username, id, displayName } = profile;

    let firstName;
    if(displayName) {
      firstName = displayName.split(" ")[0]
    }

    let credentials = await this.socialCredentialService.findByProfileIdAndPlatform(id, 'twitter');
    
    let userid: string;

    if(!credentials.length) {
      // First login for user
      const Uuid = require('cassandra-driver').types.Uuid;
      userid = Uuid.random().toString();

      const newUser = await this.userService.create({
        userid,
        firstName
      });

      credentials = await this.socialCredentialService.create({
        userid,
        profile_id: id,
        platform: 'twitter',
        auth_token: token,
        token_secret: tokenSecret,
        auth_expiration: undefined
      })
    } else {
      userid = credentials[0].userid;
      
      // Update new access token (to all tables)
      credentials = await this.socialCredentialService.update({
        userid,
        profile_id: id,
        platform: 'twitter',
        auth_token: token,
        token_secret: tokenSecret,
        auth_expiration: undefined
      })
    }

    const user:User = {
      userid,
      firstName: firstName
    };

    done(null, user);  
  }
}