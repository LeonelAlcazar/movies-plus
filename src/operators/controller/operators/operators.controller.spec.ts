import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsController } from './operators.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMTestingModule } from 'src/commons/testing-utils/typeorm-testing-module';
import { OperatorAuth } from 'src/operators/entities/operator-auth.entity';
import { Operator } from 'src/operators/entities/operator.entity';
import { OperatorAuthService } from 'src/operators/services/operator-auth/operator-auth.service';
import { OperatorService } from 'src/operators/services/operator/operator.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

describe('OperatorsController', () => {
  let controller: OperatorsController;

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
      controllers: [OperatorsController],
    }).compile();

    controller = module.get<OperatorsController>(OperatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
