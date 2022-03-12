import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  userid?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  emails?: string[];

  @ApiProperty()
  timezone?: string;

  @ApiProperty()
  createdAt?: Date;
}
