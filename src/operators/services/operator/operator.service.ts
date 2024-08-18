import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorAuth } from 'src/operators/entities/operator-auth.entity';
import { Operator } from 'src/operators/entities/operator.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OperatorAuthService } from '../operator-auth/operator-auth.service';
import { Pagination } from 'src/commons/types/pagination';
import { OperatorRegisterDTO } from 'src/operators/dtos/operator-register.dto';
import configuration from 'src/config/configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class OperatorService {
  constructor(
    @InjectRepository(Operator)
    private operatorRepository: Repository<Operator>,
    @InjectRepository(OperatorAuth)
    private operatorAuthRepository: Repository<OperatorAuth>,
    private operatorAuthService: OperatorAuthService,
    @Inject(configuration.KEY)
    private configService: ConfigType<typeof configuration>,
  ) {
    this.setup();
  }

  async setup() {
    const operators = await this.operatorRepository.find();
    if (operators.length == 0) {
      await this.register({
        email: this.configService.defaults.operator.email,
        name: 'Admin',
        password: this.configService.defaults.operator.password,
      });
    }
  }

  async find(criteria: FindOptionsWhere<Operator>, pagination: Pagination) {
    const [operators, count] = await this.operatorRepository.findAndCount({
      where: criteria,
      take: pagination.limit,
      skip: pagination.page * pagination.limit,
    });

    return { operators, count };
  }

  async findOne(criteria: FindOptionsWhere<Operator>) {
    const operator = await this.operatorRepository.findOne({ where: criteria });

    if (!operator) {
      throw new NotFoundException('User not found');
    }

    return operator;
  }

  async register(data: OperatorRegisterDTO) {
    const operatorExists = await this.operatorRepository.findOne({
      where: { email: data.email },
    });

    if (operatorExists) {
      throw new ConflictException('User already exists');
    }

    const operator = new Operator();

    operator.name = data.name;
    operator.email = data.email;
    const auth = await this.operatorAuthService.generateAuth(
      data.email,
      data.password,
    );
    await this.operatorRepository.save(operator);

    auth.user = operator;
    await this.operatorAuthRepository.save(auth);

    return operator;
  }
}
