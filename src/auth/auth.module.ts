import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { JwtStrategy } from './jwt.strategy'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, FacebookStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}