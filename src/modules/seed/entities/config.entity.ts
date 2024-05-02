import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ts: string;

  @Column()
  your_public_key: string;

  @Column()
  your_private_key: string;

  @Column()
  hash: string;
}