import { Injectable } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';

import * as dotenv from 'dotenv';
import { features } from 'process';
import { AppService } from 'src/app.service';
import { StaticImplements } from 'src/decorators/static-implements';
import { IPropertyWidget } from 'src/interfaces/property-widget.interface';
import { IRuleLayer } from 'src/interfaces/rule-layer.interface';
import { DriverOptionNotSetError } from 'typeorm';
dotenv.config();

export abstract class BaseRuleLayer implements IRuleLayer {
  public options: any;
  protected abstract type;

  // I want to render the chosen options, which are coming from database as json
  constructor(options?: any) {
    this.options = options;
  }

  setOptions(options) {
    this.options = options;
    return this;
  }

  build?() {
    throw new Error('Method not implemented.');
  }

  toObject(): object {
    return {
      type: this.type,
      options: this.options,
    };
  }

  abstract call(inputs: any);

  abstract render();
}
