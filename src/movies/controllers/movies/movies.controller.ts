import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Version,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UrlUtilsService } from 'src/commons/services/url-utils/url-utils.service';
import { MovieCreateDTO } from 'src/movies/dtos/movie-create.dto';
import { MovieListResponseDTO } from 'src/movies/dtos/movie-list-response.dto';
import { MovieUpdateDTO } from 'src/movies/dtos/movie-update.dto';
import { Movie } from 'src/movies/entities/movie.entity';
import { MovieService } from 'src/movies/services/movie/movie.service';
import { OperatorAuthentication } from 'src/operators/decorators/operator-authentication.decorator';
import { UserAuthentication } from 'src/users/decorators/user-authentication.decorator';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private movieService: MovieService,
    private urlUtilsService: UrlUtilsService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'List of movies',
    type: MovieListResponseDTO,
  })
  @Version('1')
  @Get('/')
  async list(@Query() query: any) {
    const { criteria, pagination } =
      await this.urlUtilsService.GetCriteriaAndPagination(query);

    return this.movieService.findAll(criteria, pagination);
  }

  @UserAuthentication()
  @ApiResponse({
    status: 200,
    type: Movie,
  })
  @Version('1')
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.movieService.findOne({ id });
  }

  @OperatorAuthentication()
  @ApiResponse({
    status: 201,
    type: Movie,
  })
  @Version('1')
  @Post('/')
  async create(@Body() data: MovieCreateDTO, @Req() request: Request) {
    return this.movieService.create(data, request['operator'].id);
  }

  @OperatorAuthentication()
  @ApiResponse({
    status: 200,
    type: Movie,
  })
  @Version('1')
  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: MovieUpdateDTO) {
    return this.movieService.update({ id }, data);
  }
}
