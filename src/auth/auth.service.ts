import * as dotenv from 'dotenv';
dotenv.config();
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateClientCredentials(clientID: string, clientSecret: string): boolean {
    if (
      clientID !== process.env.EXTERNAL_CLIENT_ID &&
      clientSecret !== process.env.EXTERNAL_CLIENT_SECRET
    ) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async login(user: User, type: 'user' | 'api' = 'user'): Promise<any> {
    const payload = { userid: user.userid };
    // For api access token, extend expiry to 24 hours
    const options: JwtSignOptions = {
      expiresIn: type === 'api' ? 86400 : 3600,
    };
    return {
      access_token: this.jwtService.sign(payload, options),
      expiresIn: options.expiresIn,
    };
  }

  isUserAdmin(user: User) {
    if (
      user &&
      user.userid.toString() === '00000000-0000-0000-0000-000000000000'
    ) {
      return true;
    }
    return false;
  }
}
