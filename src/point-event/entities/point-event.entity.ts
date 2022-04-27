import { ApiProperty } from '@nestjs/swagger';

export class PointEvent {
  @ApiProperty()
  hash: string;

  @ApiProperty()
  userid: string;

  @ApiProperty()
  isBurn: boolean;

  @ApiProperty()
  points: number;

  @ApiProperty()
  priority?: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  verb?: string;

  @ApiProperty()
  platform?: string;

  @ApiProperty()
  icon?: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  metadata: { [key: string]: string };
}
