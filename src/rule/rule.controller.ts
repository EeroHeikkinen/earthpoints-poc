import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { RuleService } from './rule.service';
import { Request, Response } from 'express';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { CreateRuleDto } from './dto/create-rule.dto';
import { types } from 'cassandra-driver';

@Controller('rule')
export class RuleController {
  constructor(
    private ruleService: RuleService
  ) {}

  @Get()
  @Render('edit-rules')
  async editRulesIndex(@Req() request: Request) {
    request.app.locals.layout = 'admin';
    const rules = await this.ruleService.getRules();
    return {
      rules,
      customCss: ['bootstrap.3.3.1.min.css'],
    };
  }

  @Post(':id/edit')
  @Render('edit-rule')
  async saveRule(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateRuleDto: UpdateRuleDto,
  ) {
    request.app.locals.layout = 'admin';
    const sanitizedUpdateRuleDto: UpdateRuleDto = Object.keys(updateRuleDto)
      .filter((key) => !key.startsWith('qb_'))
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: updateRuleDto[key] });
      }, {});

    const rulesParsed = JSON.parse(updateRuleDto.layersJson);
    /* rulesParsed.rules = rulesParsed.rules.filter(
      (item) => !(item.flags && item.flags.filter_readonly),
    );*/
    sanitizedUpdateRuleDto.layersJson = JSON.stringify(rulesParsed);

    sanitizedUpdateRuleDto.options = {
      message: (sanitizedUpdateRuleDto as any).message,
      points: (sanitizedUpdateRuleDto as any).points,
      priority: (sanitizedUpdateRuleDto as any).priority,
    };

    if (sanitizedUpdateRuleDto.enabled) {
      sanitizedUpdateRuleDto.enabled = true;
    } else {
      sanitizedUpdateRuleDto.enabled = false;
    }

    if (id == 'new') {
      id = sanitizedUpdateRuleDto.id = types.Uuid.random().toString();
      await this.ruleService.createRule(
        sanitizedUpdateRuleDto as CreateRuleDto,
      );
      //const redirectUrl = '/rule/' + sanitizedUpdateRuleDto.id + '/edit';
      //return response.redirect(303, redirectUrl);
    } else {
      await this.ruleService.updateRule(sanitizedUpdateRuleDto);
    }

    return await this.serveEditRulePage(request, id);
  }

  @Get('new')
  @Render('edit-rule')
  async newRule(@Req() request: Request) {
    request.app.locals.layout = 'admin';
    const rule: CreateRuleDto = {
      id: 'new',
      name: '',
      template: '',
      enabled: false,
    };

    return {
      rule,
      templates: this.ruleService.templates,
      new: true,
      customCss: ['bootstrap.3.3.1.min.css', 'query-builder.default.css'],
      customScripts: [
        'jquery.min.js?ver=1.1.0',
        'popper.min.js?ver=1.1.0',
        'bootstrap.min.js?ver=1.1.0',
        'wow.min.js?ver=1.1.0',
        'moment.min.js',
        'query-builder.standalone.js',
        'edit-rules.js',
        'bootstrap-datepicker.min.js',
      ],
    };
  }

  @Get(':id/delete')
  @Render('edit-rules')
  async deleteRule(@Req() request: Request, @Param('id') id: string) {
    await this.ruleService.deleteRule(id);
    request.app.locals.layout = 'admin';
    const rules = await this.ruleService.getRules();
    return {
      rules,
      customCss: ['bootstrap.3.3.1.min.css'],
    };
  }

  @Get(':id/edit')
  @Render('edit-rule')
  async editRule(@Req() request: Request, @Param('id') id: string) {
    return await this.serveEditRulePage(request, id);
  }

  async serveEditRulePage(request: Request, id: string) {
    request.app.locals.layout = 'admin';
    const rule = await this.ruleService.getRule(id);

    if (rule.layers.length == 0) {
      rule.layers = await rule.templateObj.initLayers();
    }

    return {
      rule,
      new: false,
      templates: this.ruleService.templates,
      customCss: ['bootstrap.3.3.1.min.css', 'query-builder.default.css'],
      customScripts: [
        'jquery.min.js?ver=1.1.0',
        'popper.min.js?ver=1.1.0',
        'bootstrap.min.js?ver=1.1.0',
        'wow.min.js?ver=1.1.0',
        'moment.min.js',
        'query-builder.standalone.js',
        'edit-rules.js',
        'bootstrap-datepicker.min.js',
      ],
    };
  }
}
