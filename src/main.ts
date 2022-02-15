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
import { NestApplicationOptions } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const fs = require('fs');
  const keyFile = process.env.NEST_APP_KEY_PATH && fs.readFileSync(process.env.NEST_APP_KEY_PATH);
  const certFile = process.env.NEST_APP_CERT_PATH && fs.readFileSync(process.env.NEST_APP_CERT_PATH);
  let options: NestApplicationOptions;
  if(keyFile && certFile)
    options = {httpsOptions : {key: keyFile, cert: certFile}};


  const app = await NestFactory.create<NestExpressApplication>(AppModule, options);
  const viewsPath = join(__dirname, '../public/views'); 
  app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
  app.use(cookieParser());
  app.set('views', viewsPath);
  app.set('view engine', '.hbs'); 
  //app.use(session.defaul({ secret: 'SECRET' })); // session secret

  app.use(
    session.default({
      secret: 'earthpoints',
      resave: false,
      saveUninitialized: false,
    }),
  );
  
  const config = new DocumentBuilder()
    .setTitle('Earthpoints API')
    .setDescription('Earthpoints API description')
    .setVersion('0.1')
    .addTag('earthpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //app.use(passport.default().initialize());
  //app.use(passport.session());
  //app.use(flash());

  await app.listen(3000);  
}
bootstrap();
