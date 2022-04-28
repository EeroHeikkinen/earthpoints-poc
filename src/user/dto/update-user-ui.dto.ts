import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import Utils from 'src/utils';

export class UpdateUserUIDto {
  userid?: string;

  @ApiProperty({
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  email?: string;

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
