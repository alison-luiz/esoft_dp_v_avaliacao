import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Creator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resourceURI: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  seriesIds: string;

  @Column()
  creatorId: number;
}