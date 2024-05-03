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

  @Column({ default: false })
  hasFetchData: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  thumbnailExtension: string;
}