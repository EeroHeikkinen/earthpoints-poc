import {
    Controller,
    Get,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { AnalyticsGuard } from 'src/auth/anlytics-auth.guard';
import { PointEventService } from 'src/point-event/point-event.service';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';
import { UserService } from 'src/user/user.service';
import { AnalyticsService } from './analytics.service';
  
  @Controller('analytics')
  export class AnalyticsController {
    constructor(
        private readonly analyticsService: AnalyticsService,
        private readonly userService: UserService,
        private readonly unsubscriptionService: UnsubscribeService,
        private readonly pointEventService: PointEventService
    ) {}
  
  
    @Get('user')
    @UseGuards(AnalyticsGuard)  
    async user(
      @Req() req,
    ){
        return await (await this.userService.findAll({fields: ['userid','country_code','created_at','timezone']})).toArray();
    }

    
    @Get('unsubscription')
    @UseGuards(AnalyticsGuard)  
    async unsubscription(
      @Req() req,
    ){
        return await this.unsubscriptionService.findAll();
    }

    @Get('point-event')
    @UseGuards(AnalyticsGuard)  
    async pointEvent(
      @Req() req,
    ){
        return await this.pointEventService.findAll();
    }


  }
  