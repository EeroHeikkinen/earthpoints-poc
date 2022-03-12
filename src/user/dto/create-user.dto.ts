import { ApiProperty } from '@nestjs/swagger';
import { CreatePlatformConnectionDto } from 'src/platform-connection/dto/create-platform-connection.dto';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';

export class CreateUserDto {
  userid?: string;

  @ApiProperty({
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    required: false,
  })
  email?: string;

  @ApiProperty({
    required: false,
  })
  emails?: string[];

  @ApiProperty({
    required: false,
  })
  timezone?: string;

  @ApiProperty({
    required: false,
  })
  createdAt?: Date;
}
