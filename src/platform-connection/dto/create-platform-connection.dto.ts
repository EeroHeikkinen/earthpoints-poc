import { ApiProperty } from '@nestjs/swagger';

export class CreatePlatformConnectionDto {
  @ApiProperty()
  userid: string;

  @ApiProperty()
  profile_id: string;

  @ApiProperty()
  platform: string;

  @ApiProperty()
  emails?: string[];

  @ApiProperty()
  auth_token: string;

  @ApiProperty()
  token_secret?: string;

  @ApiProperty()
  auth_expiration: Date;
}
