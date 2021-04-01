import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Relationship } from "./relationship";
import { User } from "./user";

@Entity({ name: "Members" })
export class Member {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({ name: "firstname", nullable: false })
  firstname: string;

  @Column({ name: "lastname", nullable: false })
  lastname: string;

  @Column({ name: "gender", nullable: false })
  gender: string;

  @Column({ name: "Date Of Birth", type: "date", nullable: true })
  dob: Date;

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

  @Column({ type: "varchar", name: "email", unique: true })
  email: string;

  @Column({ type: "bigint", name: "phone" })
  phone: string;

  @Column({ type: "text", name: "image_url" })
  imageurl: string;

  @Column({ type: "text", nullable: true, name: "about" })
  about: string;

  @ManyToOne((type) => User, (user) => user.members)
  user: User;

  @ManyToOne((type) => Relationship, (relationship) => relationship.members)
  relationship: Relationship;
}
