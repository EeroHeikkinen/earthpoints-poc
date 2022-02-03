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

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewsPath = join(__dirname, '../public/views'); 
  app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
  app.use(cookieParser());
  app.set('views', viewsPath);
  app.set('view engine', '.hbs'); 

  /*app.use(
    session.default({
      secret: 'earthpoints',
      resave: false,
      saveUninitialized: false,
    }),
  );
  */ 

  //app.use(passport.default().initialize());
  //app.use(passport.session());
  //app.use(flash());

  await app.listen(3000); 
}
bootstrap();
