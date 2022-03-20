import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import util from 'util';
import jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
const verify = util.promisify(jwt.verify);
require('dotenv').config();

@Injectable()
export class ExternalJwtMiddleware implements NestMiddleware {
  private verifyJWT(token: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.EXTERNAL_CLIENT_SECRET,
        {},
        (err, token) => {
          if (err) return reject(err);
          else return resolve(token);
        },
      );
    });
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private platformConnectionService: PlatformConnectionService,
  ) {}

  /* If the request contains a 'token' query param with a JWT
     and the contents match the client secret
     We log them into the platform by creating a matching user
     or retrieving an existing user, from the iss and profile_id items in the JWT
     This lets external platforms log users into out system
  */
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');

    const token = req.query.token as string;
    if (token) {
      try {
        const payload = (await this.verifyJWT(token)) as {
          profile_id: string;
          iss: string;
          name: string;
          redirect_url: string;
        };

        // Successfully verified the payload

        const {
          profile_id: profileId,
          iss: platform,
          name,
          redirect_url,
        } = payload;

        let firstName;
        if (name && typeof name === 'string') {
          firstName = name.split(' ')[0];
        }

        const userid = await this.userService.findOrCreateUserByEmailOrPlatform(
          {
            emails: [],
            profileId,
            platform,
            firstName,
          },
        );

        await this.platformConnectionService.create({
          userid,
          profile_id: profileId,
          platform,
          name,
          auth_token: null,
          auth_expiration: null,
        });

        const { access_token } = await this.authService.login(
          { userid },
          'user',
        );

        const secretData = {
          access_token,
          refreshToken: '',
        };

        res.cookie('auth-cookie', secretData, { httpOnly: true });
        req.cookies['auth-cookie'] = secretData;

        if (redirect_url) {
          res.cookie('external-redirect-url', redirect_url, { httpOnly: true });
          req.cookies['external-redirect-url'] = redirect_url;
        }
      } catch (err) {
        console.error(err);
      }
    }

    next();
  }
}
