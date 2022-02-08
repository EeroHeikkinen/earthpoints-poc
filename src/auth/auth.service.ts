import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async login(user: User): Promise<any> {
    const payload = { userid: user.userid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}