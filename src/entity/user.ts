import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

import { IsEmail, Length } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(3)
  @Column({type: 'varchar'})
  name: string;

  @IsEmail()
  @Index({ unique: true })
  @Column({type: 'varchar'})
  email: string;

  @Length(6)
  @Column({type: 'varchar'})
  password: string;

  @CreateDateColumn()
  signupAt: Date;

  @UpdateDateColumn()
  lastLoginAt: Date;
}
