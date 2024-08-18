import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OperatorAuthLoginResponseDTO } from 'src/operators/dtos/operator-auth-login-response.dto';
import { OperatorAuthLoginDTO } from 'src/operators/dtos/operator-auth-login.dto';
import { OperatorAuthService } from 'src/operators/services/operator-auth/operator-auth.service';

@ApiTags('Operators')
@Controller('operators/auth')
export class OperatorsAuthController {
  constructor(private operatorAuthService: OperatorAuthService) {}

  @ApiResponse({
    status: 201,
    type: OperatorAuthLoginResponseDTO,
  })
  @Version('1')
  @Post('/login')
  async login(@Body() data: OperatorAuthLoginDTO) {
    return this.operatorAuthService.login(data.email, data.password);
  }
}
