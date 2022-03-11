import { ApiProperty } from '@nestjs/swagger';

export class ClientCredentialsDto {
  @ApiProperty()
  client_id: string;
  @ApiProperty()
  client_secret: string;
}
