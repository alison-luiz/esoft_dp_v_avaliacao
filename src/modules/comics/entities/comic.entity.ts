import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  serieId: number;

  @Column()
  comicId: number;
}