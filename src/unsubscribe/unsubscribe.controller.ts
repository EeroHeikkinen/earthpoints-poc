import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  Render,
  Redirect,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { CreateUnsubscriptionDto } from './dto/create-unsubscription.dto';
import { UnsubscribeService } from './unsubscribe.service';

@Controller('unsubscribe')
export class UnsubscribeController {
  constructor(private readonly unsubscribeService: UnsubscribeService) {}


  @Get(':userid')
  @Render('unsubscribe')
  async unsubscribe(
    @Req() req,
    @Param('userid', ParseUUIDPipe) userid: string
  ){
    req.app.locals.layout = 'admin';
    let unsubscription = await this.unsubscribeService.find(userid);
    if(!unsubscription){
      await this.unsubscribeService.add({userid: userid});
      unsubscription = await this.unsubscribeService.find(userid);
    }
    return {
      userid: unsubscription.userid,
      allTemplates: this.unsubscribeService.getAllTemplates(unsubscription),
      templates: unsubscription.templates,
      reason: unsubscription.reason,
      environment: process.env.ENVIRONMENT,
      gtag: process.env.GOOGLE_TAG,
    };
  }

  @Post(':userid')
  @Redirect()
  async processUnsubscribe(
    @Req() req,
    @Param('userid', ParseUUIDPipe) userid: string,
    @Body() body: CreateUnsubscriptionDto
  ){
    if(userid !== body.userid)
      throw new BadRequestException('userid parameters does not match!');
    await this.unsubscribeService.add(body);
    return {url: `/unsubscribe/${userid}`};
  }

}
