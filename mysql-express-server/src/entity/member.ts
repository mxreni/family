import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column({ type: "varchar", name: "email" })
  email: string;

  @Column({ type: "bigint", name: "phone" })
  phone: string;

  @Column({ type: "text", name: "image_url" })
  imageurl: string;

  @ManyToOne((type) => User, (user) => user.members)
  user: User;
}
