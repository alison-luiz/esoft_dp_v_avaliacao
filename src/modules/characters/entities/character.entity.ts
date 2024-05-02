import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;
}