import { ApiProperty } from '@nestjs/swagger';
import { PointEvent } from '../entities/point-event.entity';

export class CreatePointEventResponseDto {
  @ApiProperty()
  msg: string;

  @ApiProperty()
  event: PointEvent;

  @ApiProperty()
  userTotalPoints: number;
}
