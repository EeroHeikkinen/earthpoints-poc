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
    private socialCredentialService: PlatformConnectionService,
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
    const { name, emails, id, displayName } = profile;

    let userid: string;

    if (req.user) {
      /* User already logged in via JWT cookie: we are adding an additional social profile */
      userid = req.user.userid;

      if (!req.user.email && emails && emails[0]) {
        req.user.email = emails[0].value;
        this.userService.update(req.user);
      }
    } else {
      // User logging in with Facebook
      const email = emails && emails[0] ? emails[0].value : undefined;
      const existingCredentials =
        await this.socialCredentialService.findByProfileIdAndPlatform(
          id,
          'facebook',
        );

      if (existingCredentials.length) {
        // Found an existing user with this profile ID
        userid = existingCredentials[0].userid;
      } else {
        if (email) {
          // Check out if we already have user with the same email
          const existingUser = await this.userService.findByEmail(email);
          userid = existingUser.userid;
        }
        if (!userid) {
          // First login for user

          // Create new user
          const Uuid = types.Uuid;
          userid = Uuid.random().toString();

          await this.userService.create({
            userid,
            firstName: name.givenName,
            email: emails && emails[0] ? emails[0].value : undefined,
          });
        }
      }

      await this.socialCredentialService.create({
        userid,
        profile_id: id,
        platform: 'facebook',
        auth_token: accessToken,
        auth_expiration: undefined,
      });
    }

    const user: User = {
      userid,
      firstName: name.givenName,
    };

    done(null, user);
  }
}
