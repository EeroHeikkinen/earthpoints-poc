import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-instagram-strategy';

import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { UserService } from 'src/user/user.service';

dotenv.config();

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy, 'instagram') {
  constructor(
    private userService: UserService,
    private platformConnectionService: PlatformConnectionService,
  ) {
    super({
      clientId: process.env.INSTAGRAM_APP_ID,
      clientSecret: process.env.INSTAGRAM_APP_SECRET,
      callbackUrl: process.env.INSTAGRAM_CALLBACK_URL,
      passReqToCallback: true,
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
    const emails = [];

    let userid: string;

    if (req.user) {
      /* User already logged in via JWT cookie: we are adding an additional social profile */
      const user = req.user as User;
      userid = user.userid;
      this.userService.addEmailsToUser(userid, emails);
    } else {
      userid = await this.userService.findOrCreateUserByEmailOrPlatform({
        emails: [],
        profileId: id,
        firstName: username,
        platform: 'instagram',
      });
    }

    await this.platformConnectionService.create({
      userid,
      profile_id: id,
      platform: 'instagram',
      auth_token: token,
      auth_expiration: undefined,
    });

    const user: User = {
      userid,
      firstName: username,
    };

    done(null, user);
  }
}
