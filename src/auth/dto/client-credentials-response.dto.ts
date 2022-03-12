import { ApiProperty } from '@nestjs/swagger';

export class ClientCredentialsResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  expires_in: number;

  @ApiProperty()
  token_type: string;
}
