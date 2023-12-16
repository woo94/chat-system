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
  @Column({type: 'string'})
  name: string;

  @IsEmail()
  @Index({ unique: true })
  @Column({type: 'string'})
  email: string;

  @Length(6)
  @Column({type: 'string'})
  password: string;

  @CreateDateColumn()
  signupAt: Date;

  @UpdateDateColumn()
  lastLoginAt: Date;
}
