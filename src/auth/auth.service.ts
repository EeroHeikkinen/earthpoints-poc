import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async login(user: User): Promise<any> {
    const payload = { firstName: user.firstName, email: user.email, facebookId: user.facebookId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}