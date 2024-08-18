import { ApiProperty } from '@nestjs/swagger';

export class UserAuthLoginResponseDTO {
  @ApiProperty()
  access_token: string;
}
