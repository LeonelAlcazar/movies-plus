import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class MovieCreateDTO {
  @IsString()
  @ApiProperty()
  external_id: string;

  @IsString()
  @ApiProperty()
  external_provider: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  director: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  producers: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  releaseDate: Date;
}
