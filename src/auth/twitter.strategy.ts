import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';

import * as dotenv from "dotenv";
import { User } from 'src/user/entities/user.entity';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { UserService } from 'src/user/user.service';

dotenv.config();

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private socialCredentialService: PlatformConnectionService,
    private userService: UserService) {
    super({
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
      includeEmail: true,
      passReqToCallback: true
    });
  }

  async validate(
    req: any,
    token: string,
    tokenSecret: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { username, id, displayName, emails } = profile;

    let userid: string;

    if(req.user) {
      /* User already logged in via JWT cookie: we are adding an additional social profile */
      userid = req.user.userid;

      await this.socialCredentialService.create({
        userid,
        profile_id: id,
        platform: 'twitter',
        auth_token: token,
        token_secret: tokenSecret,
        auth_expiration: undefined
      })

      // Save email to user if not yet set
      if(!req.user.email && emails && emails[0]) {
        this.userService.update({userid, email: emails[0].value})
      }
    } else {
      let firstName;
      if(displayName) {
        firstName = displayName.split(" ")[0]
      }

      let credentials = await this.socialCredentialService.findByProfileIdAndPlatform(id, 'twitter');

      if(!credentials.length) {
        // First login for user
        const Uuid = require('cassandra-driver').types.Uuid;
        userid = Uuid.random().toString();

        const newUser = await this.userService.create({
          userid,
          firstName,
          email: (emails && emails[0])? emails[0].value: undefined
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
    } 

    const user:User = {userid};

    done(null, user);  
  }
}