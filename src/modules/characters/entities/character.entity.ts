import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  seriesIds: string;

  @Column()
  characterId: number;

  @Column({ default: false })
  hasFetchData: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  thumbnailExtension: string;
}