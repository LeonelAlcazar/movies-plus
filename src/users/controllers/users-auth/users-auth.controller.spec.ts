import { Test, TestingModule } from '@nestjs/testing';
import { UsersAuthController } from './users-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from 'src/users/entities/user-auth.entity';
import { User } from 'src/users/entities/user.entity';
import { UserAuthService } from 'src/users/services/user-auth/user-auth.service';
import { UserService } from 'src/users/services/user/user.service';
import { UsersController } from '../users/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeORMTestingModule } from 'src/commons/testing-utils/typeorm-testing-module';

describe('UsersAuthController', () => {
  let controller: UsersAuthController;

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
      controllers: [UsersController, UsersAuthController],
    }).compile();

    controller = module.get<UsersAuthController>(UsersAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
