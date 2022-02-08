import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { JwtStrategy } from './jwt.strategy'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TwitterStrategy } from './twitter.strategy';
import { UserModule } from 'src/user/user.module';
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { SocialCredentialModule } from 'src/social-credential/social-credential.module';
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
    SocialCredentialModule
  ],
  providers: [AuthService, FacebookStrategy, InstagramStrategy, TwitterStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}