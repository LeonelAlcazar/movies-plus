import { BasicEntity } from 'src/database/basic.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserAuth } from './user-auth.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BasicEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @OneToOne(() => UserAuth, (userAuth) => userAuth.user)
  auth: UserAuth;
}
