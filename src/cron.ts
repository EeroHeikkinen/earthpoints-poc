import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import flash = require('connect-flash');

import * as passport from 'passport';
import * as session from 'express-session';
import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { engine } from "express-handlebars";

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';

import basicAuth from 'express-basic-auth';
import { CronService } from './cron/cron.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cronService = app.get<CronService>(CronService); // this sets the type of service and gets the instance
  await cronService.handleCron();
  try{app.close();}catch{}
}
bootstrap();
