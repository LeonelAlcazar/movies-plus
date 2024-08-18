import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserAuthService } from '../user-auth/user-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserAuth } from 'src/users/entities/user-auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeORMTestingModule } from 'src/commons/testing-utils/typeorm-testing-module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMTestingModule([User, UserAuth]),
        TypeOrmModule.forFeature([User, UserAuth]),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
        }),
      ],
      providers: [UserService, UserAuthService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
