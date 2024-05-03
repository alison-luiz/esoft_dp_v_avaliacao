import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Creator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  serieId: number;

  @Column()
  creatorId: number;

  @Column({ default: false })
  hasFetchData: boolean;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  thumbnailExtension: string;
}