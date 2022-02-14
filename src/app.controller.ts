import { Controller, Get, UseGuards, HttpStatus, Req, Render, Res, Redirect, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedExceptionFilter } from './auth/unauthorized-exception.filter';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Response } from 'express';
import { Request } from 'express';

import { AuthService } from './auth/auth.service';

import Utils from 'src/utils';
import { UserService } from './user/user.service';
import { SocialCredentialService } from './social-credential/social-credential.service';
import { User } from './user/entities/user.entity';
import { PointEventService } from './point-event/point-event.service';
import { CallbackURL } from './auth/callback-url.decorator';
import { FacebookAuthGuard } from './auth/facebook-auth.guard';
import { TwitterAuthGuard } from './auth/twitter-auth.guard';
import { InstagramAuthGuard } from './auth/instagram-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly socialCredentialService: SocialCredentialService, 
    private readonly userService: UserService, 
    private readonly authService: AuthService,
    private readonly pointEventService: PointEventService) {}

  @Get('/')
  @UseFilters(UnauthorizedExceptionFilter)
  @Render('dashboard')
  @UseGuards(JwtAuthGuard)
  async dashboard(@Req() req): Promise<any> {
    const userid = req.user.userid;

    await this.userService.syncPoints(userid);

    const events = await this.pointEventService.findAllForUser(userid);

    const formattedEvents = []
    for(let event of events) {
      const formattedEvent = event as any
      formattedEvent.formattedTimestamp = Utils.getFormattedDate(event.timestamp); 
      formattedEvent.platform = event.platform[0].toUpperCase() + event.platform.slice(1);
      formattedEvents.push(formattedEvent)
    }
    const summedPoints = events.map((event) => event.points).reduce((previous, current) => previous + current, 0)

    const credentials = await this.socialCredentialService.findByUserId(userid);
    const platforms = [
      { 
        name: 'facebook',
        Name: 'Facebook',
        show: true,
        color: 'blue'
      },
      {
        name: 'twitter',
        Name: 'Twitter',
        show: true,
        color: 'teal'
      },
      {
        name: 'instagram',
        Name: 'Instagram',
        show: true,
        color: 'red'
      }
    ]
    /* Hide already connected */
    for(let credential of credentials) {
      for(let platform of platforms) {
        if(platform.name == credential.platform)
          platform.show = false;
      }
    }
    
    return {
      user: req.user,
      summedPoints,
      events: formattedEvents,
      platforms
    }
  }

  @Get('landing')
  @Render('landing')
  async landing(@Req() req): Promise<any> {
  }

  @Get('/logout') 
  @Redirect('/')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    res.cookie('auth-cookie', '', {httpOnly:true,});

    return {msg:'success'};
  }

  @Get('/login/facebook')
  @CallbackURL('/callback/facebook/login')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/login/instagram')
  @CallbackURL('/callback/instagram/login')
  @UseGuards(InstagramAuthGuard)
  async instagramLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/login/twitter')
  @CallbackURL('/callback/twitter/login')
  @UseGuards(TwitterAuthGuard)
  async twitterLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/connect/twitter')
  @CallbackURL('/callback/twitter/connect')
  @UseGuards(TwitterAuthGuard)
  async twitterConnect(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/connect/facebook')
  @CallbackURL('/callback/facebook/connect')
  @UseGuards(FacebookAuthGuard)
  async facebookConnect(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/connect/instagram')
  @CallbackURL('/callback/instagram/connect')
  @UseGuards(InstagramAuthGuard)
  async instagramConnect(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/callback/facebook/connect') 
  @CallbackURL('/callback/facebook/connect')
  @UseGuards(FacebookAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Redirect('/')
  async facebookConnectRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const user = req.user as User;
    await this.pointEventService.rewardAccountConnected(user.userid, 'facebook')
  }

  @Get('/callback/twitter/connect') 
  @CallbackURL('/callback/twitter/connect')
  @UseGuards(TwitterAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Redirect('/')
  async twitterConnectRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const user = req.user as User;
    await this.pointEventService.rewardAccountConnected(user.userid, 'twitter')
  }

  @Get('/callback/instagram/connect') 
  @CallbackURL('/callback/instagram/connect')
  @UseGuards(InstagramAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Redirect('/')
  async instagramConnectRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {  
    const user = req.user as User;
    await this.pointEventService.rewardAccountConnected(user.userid, 'instagram')
  }


  @Get('/callback/instagram/login') 
  @CallbackURL('/callback/instagram/login')
  @UseGuards(InstagramAuthGuard)
  @Redirect('/')
  async instagramLoginRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    console.log(req.cookies)
    var user:User = req.user as User; 

    const {access_token} = await this.authService.login(user);

    const secretData = {
      access_token,
      refreshToken: '',
    };

    await this.pointEventService.rewardAccountConnected(user.userid, 'instagram')

    res.cookie('auth-cookie', secretData, {httpOnly:true,});

    return {msg:'success'};
  }

  @Get('/callback/twitter/login') 
  @CallbackURL('/callback/twitter/login')
  @UseGuards(TwitterAuthGuard)
  @Redirect('/')
  async twitterLoginRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    console.log(req.cookies)
    var user:User = req.user as User; 

    const {access_token} = await this.authService.login(user);

    const secretData = {
      access_token,
      refreshToken: '',
    }; 

    await this.pointEventService.rewardAccountConnected(user.userid, 'twitter')
 
    res.cookie('auth-cookie', secretData, {httpOnly:true,});

    return {msg:'success'};
  }


  @Get('/callback/facebook/login') 
  @CallbackURL('/callback/facebook/login')
  @UseGuards(FacebookAuthGuard)
  @Redirect('/')
  async facebookLoginRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    console.log(req.cookies)
    var user:User = req.user as User; 

    const {access_token} = await this.authService.login(user);

    const secretData = {
      access_token,
      refreshToken: '',
    };

    await this.pointEventService.rewardAccountConnected(user.userid, 'facebook')
 
    res.cookie('auth-cookie', secretData, {httpOnly:true,});

    return {msg:'success'};
  }
}