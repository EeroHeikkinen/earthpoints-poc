import { PartialType } from '@nestjs/swagger';
import { CreatePointEventDto } from './create-point-event.dto';

export class UpdatePointEventDto extends PartialType(CreatePointEventDto) {}
