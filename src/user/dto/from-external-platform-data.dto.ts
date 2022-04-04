import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePlatformConnectionDto } from 'src/platform-connection/dto/create-platform-connection.dto';
import Utils from 'src/utils';

export class UserFromExternalPlatformDataDto extends OmitType(
  CreatePlatformConnectionDto,
  ['userid'] as const,
) {

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Utils.IsTimezone()
  timezone?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Utils.IsCountryCode()
  countryCode?: string;
  

}
