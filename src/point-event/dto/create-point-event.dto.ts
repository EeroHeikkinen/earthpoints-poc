import {
    IsBoolean,
  IsDateString,
  IsEmail,
  IsHash,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreatePointEventDto {
  @IsString()
  @IsNotEmpty()
  hashString?: string;

  hash?: string;

  @IsOptional()
  @IsUUID()
  userid?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  icon?: string;

  @IsNotEmpty()
  verb: string;

  @IsNotEmpty()
  platform: string;

  @IsNotEmpty()
  message: string;

  @IsBoolean()
  isBurn: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  points: number;

  @IsDateString()
  timestamp: Date;

  metadata: Map<string, string>;
}
