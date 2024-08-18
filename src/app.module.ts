import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonsModule } from './commons/commons.module';
import configuration from './config/configuration';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { OperatorsModule } from './operators/operators.module';
import { MoviesModule } from './movies/movies.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        API_PORT: Joi.number().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        DEFAULT_OPERATOR_EMAIL: Joi.string().required(),
        DEFAULT_OPERATOR_PASSWORD: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    CommonsModule,
    JwtModule.registerAsync({
      global: true,
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => ({
        secret: configService.jwt.secret,
        signOptions: { expiresIn: configService.jwt.expiresIn },
      }),
    }),
    OperatorsModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
