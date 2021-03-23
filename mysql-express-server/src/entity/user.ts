import { OneToMany } from "typeorm";
import { Member } from "./member";

const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");
const genuuid = require("uuid").v4;

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "firstName",
    length: 80,
    nullable: false,
  })
  firstname: string;

  @Column({
    name: "lastName",
    length: 80,
    nullable: false,
  })
  lastname: string;

  @Column({
    name: "userName",
    length: 80,
    default: genuuid(),
    unique: true,
  })
  username: string;

  @Column({
    name: "email",
    length: 180,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: "password",
    nullable: false,
  })
  password: string;

  @Column()
  salt: string;

  @Column({
    name: "photourl",
    nullable: true,
  })
  photourl: string;

  @OneToMany((type) => Member, (member) => member.user)
  members: Member[];
}
