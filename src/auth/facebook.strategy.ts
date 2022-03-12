import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

import * as dotenv from 'dotenv';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { Reflector } from '@nestjs/core';
import express = require('express');
import { types } from 'cassandra-driver';

dotenv.config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private platformConnectionService: PlatformConnectionService,
    private userService: UserService,
    private jwtStrategy: JwtStrategy,
  ) {
    super({
      clientID: process.env.FACEBOOK_APP_ID || 'x',
      clientSecret: process.env.FACEBOOK_APP_SECRET || 'x',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'x',
      scope: ['user_posts', 'email'],
      profileFields: ['name', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, id } = profile;
    const firstName = name.givenName;

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
        platform: 'facebook',
      });
    }

    await this.platformConnectionService.create({
      userid,
      profile_id: id,
      platform: 'facebook',
      auth_token: accessToken,
      auth_expiration: undefined,
      emails:
        emails && emails.length ? emails.flatMap((v) => v.value) : undefined,
    });

    const user: User = {
      userid,
      firstName: name.givenName,
    };

    done(null, user);
  }
}
