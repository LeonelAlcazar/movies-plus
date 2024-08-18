import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UserAuthentication } from 'src/users/decorators/user-authentication.decorator';
import { UserRegisterDTO } from 'src/users/dtos/user-register.dto';
import { User } from 'src/users/entities/user.entity';
import { UserAuthGuard } from 'src/users/guards/user-auth/user-auth.guard';
import { UserService } from 'src/users/services/user/user.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @UserAuthentication()
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Version('1')
  @Get('/me')
  async getMe(@Req() req: Request): Promise<User> {
    return this.userService.findOne({ id: req['user'].id });
  }

  @UserAuthentication()
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Version('1')
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ id });
  }

  @ApiResponse({
    status: 201,
    type: User,
  })
  @Version('1')
  @Post('/')
  async register(@Body() data: UserRegisterDTO): Promise<User> {
    return this.userService.register(data);
  }
}
