require('dotenv').config()
import { MessageEvent, Controller, Get, UseGuards, HttpStatus, Req, Render, Res, Redirect, UseFilters, Sse, Param, Query, Body, Post, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedExceptionFilter } from './auth/unauthorized-exception.filter';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Response } from 'express';
import { Request } from 'express';

import { AuthService } from './auth/auth.service';

import Utils from 'src/utils';
import { UserService } from './user/user.service';
import { PlatformConnectionService } from './platform-connection/platform-connection.service';
import { User } from './user/entities/user.entity';
import { PointEventService } from './point-event/point-event.service';
import { CallbackURL } from './auth/callback-url.decorator';
import { FacebookAuthGuard } from './auth/facebook-auth.guard';
import { TwitterAuthGuard } from './auth/twitter-auth.guard';
import { InstagramAuthGuard } from './auth/instagram-auth.guard';
import { concatMap, filter, Observable } from 'rxjs';

import handlebars from 'handlebars'

import satelize from 'satelize'
import { CanvasService } from './canvas/canvas.service';
import { AdminOnlyGuard } from './auth/admin-only.guard';
import { CreatePointEventDto } from './point-event/dto/create-point-event.dto';

import crypto from 'crypto';
import { ApiOAuth2, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ClientCredentialsDto } from './auth/dto/client-credentials.dto';
import fs from 'fs';

import { ClientCredentialsResponseDto } from './auth/dto/client-credentials-response.dto';
import { CreatePointEventResponseDto } from './point-event/dto/create-point-event-response.dto';

@Controller()
export class AppController {
  constructor(
    private readonly socialCredentialService: PlatformConnectionService, 
    private readonly userService: UserService, 
    private readonly authService: AuthService,
    private readonly pointEventService: PointEventService,
    private readonly platformConnectionService: PlatformConnectionService,
    private readonly canvasService: CanvasService) {}

  @Sse('sse')
  @UseGuards(JwtAuthGuard)
  sse(@Req() req): Observable<MessageEvent> {
    const user = req.user as User;
        
    const renderEvents = handlebars.compile(`
      {{#each events}}
        <div class="row mb-12">
          <div class="offset-2 col-1 mr-1 mt-2">
            {{#if this.imageUrl}}
              <img src={{this.imageUrl}} class="thumbnail"/>
            {{else}}
              <i class="mt-1 fa fa-{{this.icon}} fa-2x"></i>
            {{/if}} 
          </div>
          <div class="col-5">
            <p class="grey-text"></p>
            You {{this.verb}} {{this.platform}} - {{this.formattedTimestamp}}
            </p>
            
            <h5 class="font-weight-bold">
              {{this.message}}
            </h5>
          </div>
          <div class="col-2 mt-3"><h5>{{this.points}} 🌎</h5> </div>
        </div>
      {{/each}}
    `)

    return this.pointEventService.subject.pipe(
      filter((data:any) => {
        return data.userid.toString() === user.userid.toString()}
      ), 
      concatMap(async (event) => { 
          const events = await this.pointEventService.findAllForUser(user.userid);
          const {formattedEvents, summedPoints} = this.formatUserEvents(events,user.timezone)
          formattedEvents.sort((a, b) => b.timestamp - a.timestamp)
          return { 
            data: { 
              'userid': user.userid, 
              'eventsHTML': renderEvents({events: formattedEvents}),
              'events': JSON.stringify(formattedEvents),
              summedPoints
            } 
          } 
        } 
      ))
  }

  formatUserEvents(events,timezone
    ) {
    const formattedEvents = []
    for(let event of events) {
      const formattedEvent = event as any
      formattedEvent.formattedTimestamp = Utils.getFormattedDate(event.timestamp,false,false,timezone); 
      formattedEvent.platform = event.platform[0].toUpperCase() + event.platform.slice(1);
      if (formattedEvent.icon.startsWith('https://')) {
        formattedEvent.imageUrl = formattedEvent.icon;
        formattedEvent.icon = undefined;
      }
      formattedEvents.push(formattedEvent)
    }
    formattedEvents.sort((a, b) => b.timestamp - a.timestamp)
    const summedPoints = events.map((event) => event.points).reduce((previous, current) => previous + current, 0)
    return {formattedEvents, summedPoints}
  }

  @Get('/')
  @UseFilters(UnauthorizedExceptionFilter)
  @Render('dashboard')
  @UseGuards(JwtAuthGuard)
  async dashboard(@Req() req): Promise<any> {
    req.app.locals.layout = 'main';
    const userid = req.user.userid;

    /* If necessary fill in user timezone from ip */
    if (!req.user.timezone) {
      let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      if (ip == '::1' || ip.startsWith('::ffff')) {
        ip = process.env.TEST_IP;
      }
      try {
        req.user.timezone = await new Promise<string>((resolve, reject) => {
          satelize.satelize({ ip }, (err, payload) => {
            if (err || !payload || !payload.timezone) {
              reject(err);
            }
            this.userService.update({
              userid: userid,
              timezone: payload.timezone,
            });
            resolve(payload.timezone);
          });
        });
      } catch (err) {
        console.log(
          `Failed determining timezone for IP address ${ip}: Error description ${err}`,
        );
      }
    }

    this.userService.syncPoints(userid); 

    const user = req.user as User;
    
    const {formattedEvents} = this.formatUserEvents(user.events,user.timezone)
    formattedEvents.sort((a, b) => b.timestamp - a.timestamp);

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
    for(let connection of user.connections) {
      for(let platform of platforms) {
        if(platform.name == connection.platform)
          platform.show = false;
      }
    }
    
    return {
      user: req.user,
      summedPoints: user.points,
      events: formattedEvents,
      platforms,
      environment: process.env.ENVIRONMENT
    }
  }

  @Get('landing')
  @Render('landing')
  async landing(@Req() req): Promise<any> {
    req.app.locals.layout = 'main';
    return {
      environment: process.env.ENVIRONMENT
    }    
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

  @Post('/oauth/token')
  @ApiResponse({
    status: 201,
    type: ClientCredentialsResponseDto,
  })
  async loginWithClientCredentials(
    @Body() body: ClientCredentialsDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    let { client_id: clientId, client_secret: clientSecret } = body;

    if (!clientId || !clientSecret) {
      // parse client id and secret from Basic auth header
      const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
      [clientId, clientSecret] = Buffer.from(b64auth, 'base64')
        .toString()
        .split(':');
    }

    await this.authService.validateClientCredentials(clientId, clientSecret);

    const apiUserId = '00000000-0000-0000-0000-000000000000';
    let apiUser = await this.userService.findByUserId(apiUserId);
    if (!apiUser) {
      await this.userService.create({
        userid: apiUserId,
        firstName: 'APIUser',
      });
      apiUser = await this.userService.findByUserId(apiUserId);
    }
    const { access_token } = await this.authService.login(apiUser, 'api');

    return {
      access_token: access_token,
      token_type: 'Bearer',
      expires_in: 86400,
    };
  }

  @Get('point-badge')
  //@UseGuards(JwtAuthGuard)
  async pointBadge(
    @Query('point') point,
    @Query('total') total,
    @Query('streak') streak,
    @Query('theme') theme,
    @Query('confetti') confetti,
    @Query('share') share,
    @Res() response: Response): Promise<any> {
      if(['twitter','facebook'].includes(share)){
        const content = fs.readFileSync(`public/point-badge/share/${share}.hbs`, 'utf-8');
        const template = handlebars.compile(content);
        response.send(
          template({
            base_url: process.env.BASE_URL,
            point: point,
            total: total,
            streak: streak,
            theme: theme,
            confetti: confetti,
            random: Math.floor(Math.random() * 2147483646)
          })
        );
        return;
      }
      if(total){
        return (await this.canvasService.createStatusBadgeCached(point,total,streak,theme,confetti)).pipe(response);    
      }
      return (await this.canvasService.createPointBadgeCached(point,theme,confetti)).pipe(response);
  }

  @Post('point-event')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  @ApiResponse({
    status: 201,
    type: CreatePointEventResponseDto,
  })
  async create(
    @Req() req: Request,
    @Body() createPointEventDto: CreatePointEventDto,
  ) {
    if (
      !createPointEventDto.userid &&
      createPointEventDto.externalPlatformUserData
    ) {
      for (const externalPlatformData of createPointEventDto.externalPlatformUserData) {
        const {
          emails,
          profile_id: profileId,
          platform,
          auth_token,
          auth_expiration,
          name,
        } = externalPlatformData;

        let emailsArray = emails;
        if (!Array.isArray(emails)) {
          if (emails) {
            emailsArray = [emails as unknown as string];
          } else {
            emailsArray = [];
          }
        }

        let firstName;
        if (name && typeof name === 'string') {
          firstName = name.split(' ')[0];
        }

        createPointEventDto.userid =
          await this.userService.findOrCreateUserByEmailOrPlatform({
            emails: emailsArray,
            profileId,
            platform,
            firstName,
          });

        await this.platformConnectionService.create({
          userid: createPointEventDto.userid,
          profile_id: profileId,
          name,
          platform,
          auth_token,
          auth_expiration,
          emails,
        });

        break;
      }
    }

    if (!createPointEventDto.userid && createPointEventDto.email) {
      const { email } = createPointEventDto;
      let eventUser = await this.userService.findByEmail(email);
      if (!eventUser) {
        await this.userService.create({
          email,
          emails: [email],
          createdAt: new Date(),
        });
        eventUser = await this.userService.findByEmail(email);
      }
      createPointEventDto.userid = eventUser.userid;
    }

    await this.pointEventService.create(createPointEventDto);
    const userEvents = await this.pointEventService.findAllForUser(
      createPointEventDto.userid,
    );
    const hash =
      createPointEventDto.hash ||
      crypto
        .createHash('sha256')
        .update(createPointEventDto.hashString)
        .digest('base64');

    const userTotalPoints = userEvents
      .map((event) => event.points)
      .reduce((previous, current) => previous + current, 0);

    for (const event of userEvents) {
      if (event.hash == hash) {
        return {
          msg: 'Successfully created point event',
          event,
          userTotalPoints,
        };
      }
    }

    return {
      msg: 'Error retrieving created point event',
    };
  }

}