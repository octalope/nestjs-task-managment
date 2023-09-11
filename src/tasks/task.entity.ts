import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Id } from '../util/id';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  private beforeInsert() {
    this.id = Id.create();
  }

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((/* _type */) => User, (user) => user.tasks, { eager: false })
  @Exclude()
  user: User;
}
