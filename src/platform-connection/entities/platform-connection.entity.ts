import { ApiProperty } from '@nestjs/swagger';

export class PlatformConnection {
  @ApiProperty()
  userid: string;

  @ApiProperty()
  profileId: string;

  @ApiProperty()
  platform: string;

  @ApiProperty()
  emails: string[];

  @ApiProperty()
  authToken: string;

  @ApiProperty()
  tokenSecret?: string;

  @ApiProperty()
  authExpiration: Date;

  @ApiProperty()
  head: Date;

  @ApiProperty()
  tail: Date;

  @ApiProperty()
  watchedResources: string[];
}
