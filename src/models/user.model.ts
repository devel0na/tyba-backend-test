import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "gen_users", schema: "public" })
export class User {
  @PrimaryColumn({ name: "pk" })
  pk: string;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "surname", nullable: false })
  surname: string;

  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @Column({ name: "phone", nullable: true })
  phone: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    pk: string,
    name: string,
    surname: string,
    email: string,
    phone: number,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.pk = pk;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
