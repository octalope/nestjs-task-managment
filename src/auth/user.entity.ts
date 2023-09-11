import { Task } from '../tasks/task.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Id } from '../util/id';

@Entity()
export class User {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  private beforeInsert() {
    this.id = Id.create();
  }

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((/* _type */) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
