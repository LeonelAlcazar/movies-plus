import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from 'src/database/basic.entity';
import { Operator } from 'src/operators/entities/operator.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Movie extends BasicEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: 'string',
  })
  external_id: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: 'string',
  })
  external_provider: string | null;

  @Column()
  @ApiProperty()
  title: string;

  @Column({
    type: 'longtext',
  })
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  director: string;

  @Column()
  @ApiProperty()
  producers: string;

  @Column({
    type: 'date',
    name: 'release_date',
  })
  @ApiProperty({
    type: 'string',
    format: 'date',
  })
  releaseDate: Date;

  @ManyToOne(() => Operator, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: Operator | null;

  @Column({ name: 'created_by_id', nullable: true })
  @ApiProperty({
    required: false,
    type: 'string',
  })
  createdById: string | null;
}
