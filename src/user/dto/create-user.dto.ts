import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreatePlatformConnectionDto } from 'src/platform-connection/dto/create-platform-connection.dto';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';
import Utils from 'src/utils';

export class CreateUserDto {
  @Expose()
  userid?: string;

  @ApiProperty({
    required: false,
  })
  @Expose()
  firstName?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Expose()
  email?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Expose()
  emails?: string[];

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Utils.IsTimezone()
  @Expose()
  timezone?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Utils.IsCountryCode()
  @Expose()
  countryCode?: string;

  @ApiProperty({
    required: false,
  })
  createdAt?: Date;
}
