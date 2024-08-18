import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty()
  updatedAt: Date;
}
