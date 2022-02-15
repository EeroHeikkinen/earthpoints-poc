import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

import * as dotenv from "dotenv";
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { Reflector } from '@nestjs/core';
import express = require('express');

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
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      scope: ['user_posts'],
      profileFields: ['name'],
      passReqToCallback: true
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

    if(req.user) {
      /* User already logged in via JWT cookie: we are adding an additional social profile */
      userid = req.user.userid;

      await this.socialCredentialService.create({
        userid,
        profile_id: id,
        platform: 'facebook',
        auth_token: accessToken,
        auth_expiration: undefined
      })
    }
    else {
      let credentials = await this.socialCredentialService.findByProfileIdAndPlatform(id, 'facebook');
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
    }

    const user:User = {
      userid,
      firstName: name.givenName
    };

    done(null, user);
  }
}