import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { IsEmail, isEmail, isString, Length } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(3)
  @Column()
  name: string;

  @IsEmail()
  @Column()
  email: string;

  @Length(6)
  @Column()
  password: string;

  @CreateDateColumn()
  signupAt: Date;

  @UpdateDateColumn()
  lastLoginAt: Date;
}
