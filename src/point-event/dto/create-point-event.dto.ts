import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { UserFromExternalPlatformDataDto } from 'src/user/dto/from-external-platform-data.dto';

export class CreatePointEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'The hash string is used to make sure each event will only result in points awarded once. It should be unique for each event and user, in such a way the same hashString will predictably get generated if the same event was sent again. For example, it could be the string "created-pledge-page" followed by the user\'s id in another system.',
    example: 'created-pledge-page-1234567',
  })
  hashString?: string;

  hash?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: '',
    description:
      'Already existing User UUID in the system. One of this or an email is required.',
  })
  @IsUUID()
  userid?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    isArray: true,
    type: UserFromExternalPlatformDataDto,
    description:
      'External platform user data. This is used to identify the correct user. If no user is found, a new user will be created and tagged with the provided external credentials.',
  })
  externalPlatformUserData?: UserFromExternalPlatformDataDto[];

  @IsOptional()
  @ApiProperty({
    required: false,
    deprecated: true,
    description:
      'Email to associate the points with. If an user with this email is not found, a new user will be created. One of this or an User UUID is required.',
    example: 'my.user@gmail.com',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
    description:
      'Icon to display in web interface (Font Awesome version 6.0.0)',
    example: 'star',
  })
  icon?: string;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'The verb to display along with the point event in user interfaces. For example: "You connected Facebook"',
    example: 'created a',
  })
  verb: string;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'Social platform (twitter, instagram, facebook) or other external platform where the event was awarded from',
    example: 'pledge-page',
  })
  platform: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Message to display to the user.',
    example: 'You created a pledge page.',
  })
  message: string;

  @IsBoolean()
  @ApiProperty({
    description:
      'For awarding points, set this to false. Set to true if you want to consume points instead of awarding them',
    example: false,
  })
  isBurn: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Number of points to award for this event.',
    example: 5,
  })
  points: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description:
      'Priority of point event. Higher priority events will override lower ones for same hashString.',
    example: 5,
  })
  priority?: number;

  @IsDateString()
  @ApiProperty({
    description:
      'For displaying to the user, the related time when the points were awarded.',
    example: '2022-03-11T14:20:20.546Z',
  })
  timestamp: Date;

  @IsOptional()
  @ApiProperty({
    type: 'object',
    description: 'Any custom metadata',
  })
  metadata?: Map<string, string>;
}
