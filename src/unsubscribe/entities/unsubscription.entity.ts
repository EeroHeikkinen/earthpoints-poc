import { ApiProperty } from '@nestjs/swagger';

export class Unsubscription {
  @ApiProperty()
  userid: string;

  @ApiProperty()
  templates?: string[];
}
