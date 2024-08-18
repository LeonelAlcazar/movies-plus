import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MovieCreateDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  external_id: string;

  @IsString()
  @IsOptional()
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

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  releaseDate: Date;
}
