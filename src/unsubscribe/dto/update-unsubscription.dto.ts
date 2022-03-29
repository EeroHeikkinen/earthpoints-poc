import { PartialType } from '@nestjs/swagger';
import { CreateUnsubscriptionDto } from './create-unsubscription.dto';

export class UpdateUnsubscriptionDto extends PartialType(CreateUnsubscriptionDto) {}
