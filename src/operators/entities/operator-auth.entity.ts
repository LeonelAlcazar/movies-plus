import { BasicEntity } from 'src/database/basic.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Operator } from './operator.entity';

@Entity()
export class OperatorAuth extends BasicEntity {
  @Column()
  identification: string;

  @Column()
  password: string;

  @OneToOne(() => Operator, (operator) => operator.auth)
  @JoinColumn({
    name: 'operator_id',
  })
  user: Operator;

  @Column({
    name: 'operator_id',
  })
  userId: string;
}
