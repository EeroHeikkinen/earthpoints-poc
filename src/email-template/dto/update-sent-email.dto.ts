import { PartialType } from '@nestjs/swagger';
import { CreateSentEmailDto } from './sent-email.dto';

export class UpdatePointEventDto extends PartialType(CreateSentEmailDto) {}
