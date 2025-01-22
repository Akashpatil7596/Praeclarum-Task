import { hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ToDo } from './to-do';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 255 })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hash(this.password, 8);
  }

  @Column('bigint', { nullable: true })
  otp: number;

  @Column('boolean', { default: false })
  verified: boolean;

  @OneToMany(() => ToDo, (todo) => todo.user)
  todo: ToDo[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
