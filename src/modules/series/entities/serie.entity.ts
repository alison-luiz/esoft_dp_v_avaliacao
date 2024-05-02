import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serieId: number;

  @Column()
  title: string;

  @Column({ nullable: true})
  description: string;

  @Column()
  startYear: number;

  @Column()
  endYear: number;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  thumbnailExtension: string;
}