import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class MovieUpdateDTO {
  @IsString()
  @ApiProperty()
  external_id?: string;

  @IsString()
  @ApiProperty()
  external_provider?: string;

  @IsString()
  @ApiProperty()
  title?: string;

  @IsString()
  @ApiProperty()
  description?: string;

  @IsString()
  @ApiProperty()
  director?: string;

  @IsString()
  @ApiProperty()
  producers?: string;

  @IsDate()
  @ApiProperty()
  releaseDate?: Date;
}
