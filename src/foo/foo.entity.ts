import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Foo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  bar: string;

  @Column()
  baz: string;
}
