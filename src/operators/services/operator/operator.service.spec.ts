import { Test, TestingModule } from '@nestjs/testing';
import { OperatorService } from './operator.service';
import { TypeORMTestingModule } from 'src/commons/testing-utils/typeorm-testing-module';
import { Operator } from 'src/operators/entities/operator.entity';
import { OperatorAuth } from 'src/operators/entities/operator-auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { OperatorAuthService } from '../operator-auth/operator-auth.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

describe('OperatorService', () => {
  let service: OperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        TypeORMTestingModule([Operator, OperatorAuth]),
        TypeOrmModule.forFeature([Operator, OperatorAuth]),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
        }),
      ],
      providers: [OperatorService, OperatorAuthService],
    }).compile();

    service = module.get<OperatorService>(OperatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
