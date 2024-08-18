import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Version,
} from '@nestjs/common';
import { ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OperatorAuthentication } from 'src/operators/decorators/operator-authentication.decorator';
import { OperatorRegisterDTO } from 'src/operators/dtos/operator-register.dto';
import { Operator } from 'src/operators/entities/operator.entity';
import { OperatorService } from 'src/operators/services/operator/operator.service';

@ApiTags('Operators')
@Controller('operators')
export class OperatorsController {
  constructor(private operatorService: OperatorService) {}

  @OperatorAuthentication()
  @ApiResponse({
    status: 200,
    type: Operator,
  })
  @Version('1')
  @Get('/me')
  async getMe(@Req() req: Request) {
    return this.operatorService.findOne({ id: req['operator'].id });
  }

  @OperatorAuthentication()
  @ApiResponse({
    status: 200,
    type: Operator,
  })
  @Version('1')
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.operatorService.findOne({ id });
  }

  @OperatorAuthentication()
  @ApiResponse({
    status: 201,
    type: Operator,
  })
  @Version('1')
  @Post('/')
  async register(@Body() data: OperatorRegisterDTO) {
    return this.operatorService.register(data);
  }
}
