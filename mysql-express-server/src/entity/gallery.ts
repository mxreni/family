import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Gallery" })
export class Gallery {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "media_url" })
  media_url: string;

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
}
