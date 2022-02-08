import { Controller, Get, UseGuards, HttpStatus, Req, Render, Res, Redirect, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedExceptionFilter } from './auth/unauthorized-exception.filter';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Response } from 'express';
import { Request } from 'express';

import { AuthService } from './auth/auth.service';
import { AchievementService } from './achievement/achievement.service';

import Utils from 'src/utils';
import { UserService } from './user/user.service';
import { SocialCredentialService } from './social-credential/social-credential.service';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly socialCredentialService: SocialCredentialService, private readonly userService: UserService, private readonly authService: AuthService, private readonly achievementService: AchievementService) {}

  @Get('test')
  //@UseFilters(UnauthorizedExceptionFilter)
  //@Render('dashboard')
  //@UseGuards(JwtAuthGuard)
  async test(@Req() req): Promise<any> {
    return this.userService.calculatePoints('00000000-0000-0000-0000-000000000000');
  }

  @Get()
  @UseFilters(UnauthorizedExceptionFilter)
  @Render('dashboard')
  @UseGuards(JwtAuthGuard)
  async dashboard(@Req() req): Promise<any> {
    await this.userService.calculatePoints(req.user.userid);

    //let achievements = await this.achievementService.getAchievements(req.user.facebookId)

    /*achievements = achievements.map((item)=> {
      item.formattedTimestamp = Utils.getFormattedDate(item.timestamp);
      return item;
    })*/

    //const earthPoints = await this.achievementService.getEarthPoints(req.user.facebookId)

    return {
      user: req.user,
      //achievements,
      //earthPoints
    }
  }

  @Get('landing')
  @Render('landing')
  async landing(@Req() req): Promise<any> {
  }

  @Get('authenticated')
  @UseFilters(UnauthorizedExceptionFilter)
  @Render('authenticated')
  @UseGuards(JwtAuthGuard)
  async authenticated(@Req() req): Promise<any> {
    return {
      user: req.user
    }
  }

  @Get('/login/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/login/instagram')
  @UseGuards(AuthGuard('instagram'))
  async instagramLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/login/twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect') 
  @UseGuards(AuthGuard('facebook'))
  @Redirect('https://localhost:3000')
  async facebookLoginRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    console.log(req.cookies)
    var user:User = req.user as User; 

    const {access_token} = await this.authService.login(user);

    const secretData = {
      access_token,
      refreshToken: '',
    };
 
    res.cookie('auth-cookie', secretData, {httpOnly:true,});

    return {msg:'success'};
  }

  @Get('/logout') 
  @Redirect('https://localhost:3000')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    res.cookie('auth-cookie', '', {httpOnly:true,});

    return {msg:'success'};
  }

  @Get('/instagram/redirect') 
  @UseGuards(AuthGuard('instagram'))
  @Redirect('https://localhost:3000')
  async instagramLoginRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    console.log(req.cookies)
    var user:User = req.user as User; 

    const {access_token} = await this.authService.login(user);

    const secretData = {
      access_token,
      refreshToken: '',
    };

    res.cookie('auth-cookie', secretData, {httpOnly:true,});

    return {msg:'success'};
  }

  @Get('/twitter/redirect') 
  @UseGuards(AuthGuard('twitter'))
  @Redirect('https://localhost:3000')
  async twitterLoginRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    console.log(req.cookies)
    var user:User = req.user as User; 

    const {access_token} = await this.authService.login(user);

    const secretData = {
      access_token,
      refreshToken: '',
    }; 
 
    res.cookie('auth-cookie', secretData, {httpOnly:true,});

    return {msg:'success'};

    /*return {
      statusCode: HttpStatus.OK,
      payload: req.user,
    };*/
  }
}