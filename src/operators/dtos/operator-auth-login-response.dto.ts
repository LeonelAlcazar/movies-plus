import { ApiProperty } from '@nestjs/swagger';

export class OperatorAuthLoginResponseDTO {
  @ApiProperty()
  access_token: string;
}
