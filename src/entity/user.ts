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
  @Column()
  name: string;

  @IsEmail()
  @Index({ unique: true })
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
