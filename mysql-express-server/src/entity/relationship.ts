import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Member } from "./member";

@Entity({ name: "Relationships" })
export class Relationship {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({
    name: "Name",
    length: 50,
    nullable: false,
  })
  name: string;

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

  @OneToMany((type) => Member, (member) => member.relationship)
  members: Member[];
}
