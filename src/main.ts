import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import flash = require('connect-flash');

import * as passport from 'passport';
import sessions from 'client-sessions';

import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { engine } from "express-handlebars";

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';

import basicAuth from 'express-basic-auth';

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
  app.engine(
    '.hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'main',
      helpers: {
        baseUrl: () => process.env.BASE_URL,
        eq: (a, b) => a == b,
        renderLayer: (layer) => layer.render(),
      },
    }),
  );

  app.use(cookieParser());
  app.set('views', viewsPath);
  app.set('view engine', '.hbs'); 

  app.use(
    sessions({
      cookieName: 'session', // cookie name dictates the key name added to the request object
      secret: process.env.JWT_SECRET, // should be a large unguessable string
      duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
      activeDuration: 1000 * 60 * 5 * 2000,
      cookie: {
        ephemeral: false, // when true, cookie expires when the browser closes
        httpOnly: false, // when true, cookie is not accessible from javascript
        //secure: true, // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Earthpoints API')
    .setDescription('Earthpoints API description')
    .setVersion('0.1')
    .addTag('earthpoints')
    .addOAuth2({
      type: 'oauth2',
      bearerFormat: 'JWT',
      scheme: 'bearer',
      flows: {
        clientCredentials: {
          tokenUrl: `${process.env.BASE_URL}/oauth/token`,
          scopes: {},
        },
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //app.use(passport.default().initialize());
  //app.use(passport.session());
  //app.use(flash());

  app.use(
    '/email-template/*',
    basicAuth({
      challenge: true,
      users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASS },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
