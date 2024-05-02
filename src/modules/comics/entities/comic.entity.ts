import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  published_at: Date;

  @Column()
  cover_url: string;
}