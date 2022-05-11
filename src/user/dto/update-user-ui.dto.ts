import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import Utils from 'src/utils';

export class UpdateUserUIDto {
  userid?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Utils.IsCountryCode()
  countryCode?: string;

  @ApiProperty({
    required: false,
  })
  phone?: string;
}
