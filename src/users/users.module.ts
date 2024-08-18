import { Module } from '@nestjs/common';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { UserService } from './services/user/user.service';
import { UsersController } from './controllers/users/users.controller';
import { UsersAuthController } from './controllers/users-auth/users-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAuth } from './entities/user-auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuth])],
  providers: [UserAuthService, UserService],
  controllers: [UsersController, UsersAuthController],
})
export class UsersModule {}
