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
    nullable: true,
  })
  email: string;

  @Column({
    name: "password",
    nullable: true,
  })
  password: string;

  @Column("timestamp", {
    name: "createdAt",
    default: () => `now()`,
    nullable: false,
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updatedAt",
    default: () => `now()`,
    nullable: false,
  })
  updatedAt: Date;

  @Column({ type: "text", name: "photo_url", nullable: true })
  photourl: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ name: "facebookID", length: 80, nullable: true })
  facebookID: string;

  @Column({ name: "googleID", length: 80, nullable: true })
  googleID: string;

  @Column({ name: "twitterID", length: 80, nullable: true })
  twitterID: string;

  @OneToMany((type) => Member, (member) => member.user)
  members: Member[];
}
