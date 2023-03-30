import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column() // 암호화.
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'END' })
  role: string;
}
