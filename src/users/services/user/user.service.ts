import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/commons/types/pagination';
import { UserRegisterDTO } from 'src/users/dtos/user-register.dto';
import { User } from '../../entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserAuthService } from '../user-auth/user-auth.service';
import { UserAuth } from 'src/users/entities/user-auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
    private userAuthService: UserAuthService,
  ) {}

  async find(criteria: FindOptionsWhere<User>, pagination: Pagination) {
    const [users, count] = await this.userRepository.findAndCount({
      where: criteria,
      take: pagination.limit,
      skip: pagination.page * pagination.limit,
    });

    return { users, count };
  }

  async findOne(criteria: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({ where: criteria });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async register(data: UserRegisterDTO) {
    const userExists = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const user = new User();

    user.name = data.name;
    user.email = data.email;
    const auth = await this.userAuthService.generateAuth(
      data.email,
      data.password,
    );
    await this.userRepository.save(user);

    auth.user = user;
    await this.userAuthRepository.save(auth);

    return user;
  }
}
