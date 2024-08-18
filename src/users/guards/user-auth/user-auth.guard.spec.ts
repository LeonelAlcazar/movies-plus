import { JwtService } from '@nestjs/jwt';
import { UserAuthGuard } from './user-auth.guard';
import { UserService } from 'src/users/services/user/user.service';

describe('UserAuthGuard', () => {
  it('should be defined', () => {
    //expect(new UserAuthGuard()).toBeDefined();
  });
});
