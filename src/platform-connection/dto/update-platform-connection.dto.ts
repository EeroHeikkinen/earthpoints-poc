import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformConnectionDto } from './create-platform-connection.dto';

export class UpdatePlatformConnectionDto extends PartialType(CreatePlatformConnectionDto) {}
