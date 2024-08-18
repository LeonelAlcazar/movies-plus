import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthLoginResponseDTO } from '../../dtos/user-auth-login-response.dto';
import { UserAuthLoginDTO } from '../../dtos/user-auth-login.dto';
import { UserAuthService } from '../../services/user-auth/user-auth.service';

@ApiTags('users')
@Controller('users/auth')
export class UsersAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @ApiResponse({
    status: 200,
    type: UserAuthLoginResponseDTO,
  })
  @Version('1')
  @Post('/login')
  async login(@Body() data: UserAuthLoginDTO): Promise<{
    access_token: string;
  }> {
    return this.userAuthService.login(data.email, data.password);
  }
}
