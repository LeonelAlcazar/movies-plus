import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from '../guards/user-auth/user-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function UserAuthentication() {
  return applyDecorators(
    UseGuards(UserAuthGuard),
    ApiBearerAuth('user bearer'),
  );
}
