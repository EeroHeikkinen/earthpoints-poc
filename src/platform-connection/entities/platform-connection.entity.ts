import { ApiProperty } from '@nestjs/swagger';

export class PlatformConnection {
  @ApiProperty({
    required: true,
  })
  userid: string;

  @ApiProperty({
    required: true,
  })
  profileId: string;

  @ApiProperty({
    required: true,
  })
  platform: string;

  @ApiProperty({
    required: false,
  })
  emails: string[];

  @ApiProperty({
    required: false,
  })
  authToken: string;

  @ApiProperty({
    required: false,
  })
  tokenSecret?: string;

  @ApiProperty({
    required: false,
  })
  authExpiration: Date;

  @ApiProperty({
    required: false,
  })
  head: Date;

  @ApiProperty({
    required: false,
  })
  tail: Date;

  @ApiProperty({
    required: false,
  })
  watchedResources: string[];
}
