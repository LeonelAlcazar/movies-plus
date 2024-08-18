import { BasicEntity } from 'src/database/basic.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserAuth extends BasicEntity {
  @Column()
  identification: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({
    name: 'user_id',
  })
  userId: string;
}
