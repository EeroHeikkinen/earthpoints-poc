import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreatePlatformConnectionDto {
  @ApiProperty({
    required: false,
  })
  userid: string;

  @ApiProperty({
    required: true,
  })
  profile_id: string;

  @ApiProperty({
    required: true,
  })
  platform: string;

  @ApiProperty({
    required: false,
  })
  emails?: string[];

  @ApiProperty({
    required: false,
  })
  name?: string;

  @ApiProperty({
    required: false,
  })
  phone?: number;

  @ApiProperty({
    required: false,
  })
  auth_token: string;

  @ApiProperty({
    required: false,
  })
  token_secret?: string;

  @ApiProperty({
    required: false,
  })
  auth_expiration: Date;
}
