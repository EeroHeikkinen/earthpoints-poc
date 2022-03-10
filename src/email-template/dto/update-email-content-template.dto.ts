import { PartialType } from '@nestjs/swagger';
import { CreateEmailContentTemplateDto } from './email-content-template.dto';

export class UpdateEmailContentTemplateDto extends PartialType(
  CreateEmailContentTemplateDto,
) {}
