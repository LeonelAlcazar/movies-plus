import { Test, TestingModule } from '@nestjs/testing';
import { OperatorAuthService } from './operator-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMTestingModule } from 'src/commons/testing-utils/typeorm-testing-module';
import { OperatorAuth } from 'src/operators/entities/operator-auth.entity';
import { Operator } from 'src/operators/entities/operator.entity';
import { OperatorService } from '../operator/operator.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

describe('OperatorAuthService', () => {
  let service: OperatorAuthService;

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

    service = module.get<OperatorAuthService>(OperatorAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
