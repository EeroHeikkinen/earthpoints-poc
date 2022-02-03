import { Controller, Get, UseGuards, HttpStatus, Req, Render, Res, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Response } from 'express';
import { Request } from 'express';

import { AuthService } from './auth/auth.service';
import { AchievementService } from './achievement/achievement.service';
import { User } from './interfaces/user.interface';

import Utils from 'src/utils';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly achievementService: AchievementService) {}

  @Get()
  @Render('profile')
  @UseGuards(JwtAuthGuard)
  async getPoints(@Req() req): Promise<any> {
    let achievements = await this.achievementService.getAchievements(req.user.facebookId)

    achievements = achievements.map((item)=> {
      item.formattedTimestamp = Utils.getFormattedDate(item.timestamp);
      return item;
    })
    
    const earthPoints = await this.achievementService.getEarthPoints(req.user.facebookId)

    return {
      user: req.user,
      achievements,
      earthPoints
    }
  }

  @Get('/login')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect') 
  @UseGuards(AuthGuard('facebook'))
  @Redirect('http://localhost:3000')
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

    /*return {
      statusCode: HttpStatus.OK,
      payload: req.user,
    };*/
  }
}