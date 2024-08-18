import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorAuth } from 'src/operators/entities/operator-auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OperatorAuthService {
  constructor(
    @InjectRepository(OperatorAuth)
    private operatorAuthRepository: Repository<OperatorAuth>,
    private jwtService: JwtService,
  ) {}

  async generateAuth(identification: string, password: string) {
    const auth = new OperatorAuth();

    auth.identification = identification;
    auth.password = await bcrypt.hash(password, 10);

    return auth;
  }

  async login(identification: string, password: string) {
    const auth = await this.operatorAuthRepository.findOne({
      where: { identification },
    });

    if (!auth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, auth.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = await this.jwtService.sign({ sub: auth.userId });

    return { access_token };
  }
}
