import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from 'src/database/basic.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { OperatorAuth } from './operator-auth.entity';

@Entity()
export class Operator extends BasicEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @OneToOne(() => OperatorAuth, (operatorAuth) => operatorAuth.user)
  auth: OperatorAuth;
}
