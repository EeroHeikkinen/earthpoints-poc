import { ApiProperty } from '@nestjs/swagger';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';
import { PointEvent } from 'src/point-event/entities/point-event.entity';

export class User {
  @ApiProperty()
  userid: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  emails?: string[];

  @ApiProperty()
  timezone?: string;

  @ApiProperty()
  countryCode?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  events?: PointEvent[];

  @ApiProperty()
  connections?: PlatformConnection[];

  @ApiProperty()
  points?: number;

  @ApiProperty()
  lastEmailed?: Date;
}
