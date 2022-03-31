import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePlatformConnectionDto } from 'src/platform-connection/dto/create-platform-connection.dto';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';

export class CreateUserDto {
  userid?: string;

  @ApiProperty({
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  emails?: string[];

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  timezone?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  countryCode?: string;

  @ApiProperty({
    required: false,
  })
  createdAt?: Date;
}
