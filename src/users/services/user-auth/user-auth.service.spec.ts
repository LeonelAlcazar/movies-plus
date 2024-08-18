import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthService } from './user-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from 'src/users/entities/user.entity';
import { UserAuth } from 'src/users/entities/user-auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeORMTestingModule } from 'src/commons/testing-utils/typeorm-testing-module';

describe('UserAuthService', () => {
  let service: UserAuthService;

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

    service = module.get<UserAuthService>(UserAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
