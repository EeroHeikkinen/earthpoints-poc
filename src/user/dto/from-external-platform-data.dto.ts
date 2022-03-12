import { OmitType } from '@nestjs/swagger';
import { CreatePlatformConnectionDto } from 'src/platform-connection/dto/create-platform-connection.dto';

export class UserFromExternalPlatformDataDto extends OmitType(
  CreatePlatformConnectionDto,
  ['userid'] as const,
) {}
