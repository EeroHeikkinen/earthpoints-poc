import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateUnsubscriptionDto {
  @IsUUID()
  @ApiProperty()  
  userid?: string;

  @ApiProperty({
    required: false,
  })
  templates?: string[];

  @ApiProperty()  
  reason?: string;

}
