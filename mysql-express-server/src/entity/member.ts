import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Relationship } from "./relationship";
import { User } from "./user";

@Entity({ name: "Members" })
export class Member {
  @PrimaryGeneratedColumn("rowid")
  id: string;

  @Column({ name: "firstname", nullable: false })
  firstname: string;

  @Column({ name: "lastname", nullable: false })
  lastname: string;

  @Column({ name: "gender", nullable: false })
  gender: string;

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

  @Column({ type: "varchar", name: "email" })
  email: string;

  @Column({ type: "bigint", name: "phone" })
  phone: string;

  @Column({ type: "text", name: "image_url" })
  imageurl: string;

  @ManyToOne((type) => User, (user) => user.members)
  user: User;

  @ManyToOne((type) => Relationship, (relationship) => relationship.members)
  relationship: Relationship;
}
