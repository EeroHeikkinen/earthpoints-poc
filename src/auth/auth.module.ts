import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { JwtStrategy } from './jwt.strategy'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TwitterStrategy } from './twitter.strategy';
import { UserModule } from 'src/user/user.module';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { PlatformConnectionModule } from 'src/platform-connection/platform-connection.module';
import { InstagramStrategy } from './instagram.strategy';

@Module({
  imports: [
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
    UserModule,
    PlatformConnectionModule
  ],
  providers: [AuthService, FacebookStrategy, InstagramStrategy, TwitterStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}