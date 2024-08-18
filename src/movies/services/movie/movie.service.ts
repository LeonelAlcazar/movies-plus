import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/commons/types/pagination';
import { MovieCreateDTO } from 'src/movies/dtos/movie-create.dto';
import { MovieUpdateDTO } from 'src/movies/dtos/movie-update.dto';
import { Movie } from 'src/movies/entities/movie.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(
    criteria: FindOptionsWhere<Movie>,
    pagination: Pagination,
  ): Promise<{
    movies: Movie[];
    count: number;
  }> {
    const [movies, count] = await this.movieRepository.findAndCount({
      where: criteria,
      take: pagination.limit,
      skip: pagination.page * pagination.limit,
    });

    return {
      movies,
      count,
    };
  }

  async findOne(criteria: FindOptionsWhere<Movie>): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: criteria,
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async create(data: MovieCreateDTO, createdBy: string): Promise<Movie> {
    const movie = new Movie();

    movie.title = data.title;
    movie.description = data.description;
    movie.director = data.director;
    movie.producers = data.producers;
    movie.releaseDate = new Date(data.releaseDate);
    movie.external_id = data.external_id;
    movie.external_provider = data.external_provider;
    movie.createdById = createdBy;

    return this.movieRepository.save(movie);
  }

  async update(
    criteria: FindOptionsWhere<Movie>,
    data: MovieUpdateDTO,
  ): Promise<Movie> {
    const movie = await this.findOne(criteria);

    movie.title = data.title ?? movie.title;
    movie.description = data.description ?? movie.description;
    movie.director = data.director ?? movie.director;
    movie.producers = data.producers ?? movie.producers;
    movie.releaseDate = data.releaseDate
      ? new Date(data.releaseDate)
      : movie.releaseDate;
    movie.external_id = data.external_id ?? movie.external_id;
    movie.external_provider = data.external_provider ?? movie.external_provider;

    return this.movieRepository.save(movie);
  }
}
