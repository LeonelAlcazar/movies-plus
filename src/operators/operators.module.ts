import { Module } from '@nestjs/common';
import { OperatorService } from './services/operator/operator.service';
import { OperatorAuthService } from './services/operator-auth/operator-auth.service';
import { OperatorsController } from './controller/operators/operators.controller';
import { OperatorsAuthController } from './controller/operators-auth/operators-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operator } from './entities/operator.entity';
import { OperatorAuth } from './entities/operator-auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operator, OperatorAuth])],
  providers: [OperatorService, OperatorAuthService],
  controllers: [OperatorsController, OperatorsAuthController],
})
export class OperatorsModule {}
