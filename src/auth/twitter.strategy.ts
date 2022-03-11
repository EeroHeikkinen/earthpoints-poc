import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';

import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { UserService } from 'src/user/user.service';
import { types } from 'cassandra-driver';

dotenv.config();

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(
    private socialCredentialService: PlatformConnectionService,
    private userService: UserService,
  ) {
    super({
      includeEmail: true,
      consumerKey: process.env.TWITTER_KEY || 'x',
      consumerSecret: process.env.TWITTER_SECRET || 'x',
      callbackURL: process.env.TWITTER_CALLBACK_URL || 'x',
      passReqToCallback: true,
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

    let firstName;
    if (displayName) {
      firstName = displayName.split(' ')[0];
    }

    let userid: string;

    if (req.user) {
      /* User already logged in via JWT cookie: we are adding an additional social profile */
      const user = req.user as User;
      userid = user.userid;
      this.userService.addEmailsToUser(userid, emails);
    } else {
      userid = await this.userService.findOrCreateUserByEmailOrPlatform({
        emails,
        profileId: id,
        firstName,
      });
    }

    await this.socialCredentialService.create({
      userid,
      profile_id: id,
      platform: 'twitter',
      auth_token: token,
      token_secret: tokenSecret,
      auth_expiration: undefined,
      emails:
        emails && emails.length ? emails.flatMap((v) => v.value) : undefined,
    });

    const user: User = { userid };

    done(null, user);
  }
}
