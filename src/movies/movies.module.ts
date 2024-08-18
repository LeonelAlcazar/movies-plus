import { Module } from '@nestjs/common';
import { MovieService } from './services/movie/movie.service';
import { MoviesController } from './controllers/movies/movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { UsersModule } from 'src/users/users.module';
import { OperatorsModule } from 'src/operators/operators.module';
import { CommonsModule } from 'src/commons/commons.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    UsersModule,
    OperatorsModule,
    CommonsModule,
    HttpModule,
  ],
  providers: [MovieService],
  controllers: [MoviesController],
})
export class MoviesModule {}
