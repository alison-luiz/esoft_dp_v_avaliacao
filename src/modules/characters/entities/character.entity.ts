import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resourceURI: string;

  @Column()
  name: string;

  @Column()
  seriesIds: string;

  @Column()
  characterId: number;
}