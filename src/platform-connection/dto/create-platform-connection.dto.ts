import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlatformConnectionDto {
  @ApiProperty({
    required: false,
  })
  userid: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  profile_id: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  platform: string;

  @ApiProperty({
    required: false,
  })
  emails?: string[];

  @ApiProperty({
    required: false,
  })
  phone?: string;

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
