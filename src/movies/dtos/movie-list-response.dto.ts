import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';

export class MovieListResponseDTO {
  @ApiProperty({
    type: [Movie],
  })
  movies: Movie[];

  @ApiProperty()
  count: number;
}
