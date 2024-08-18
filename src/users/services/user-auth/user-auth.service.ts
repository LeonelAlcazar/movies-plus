import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserAuth } from '../../entities/user-auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
    private jwtService: JwtService,
  ) {}

  async generateAuth(identification: string, password: string) {
    const auth = new UserAuth();

    auth.identification = identification;
    auth.password = await bcrypt.hash(password, 10);

    return auth;
  }

  async login(identification: string, password: string) {
    const auth = await this.userAuthRepository.findOne({
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
