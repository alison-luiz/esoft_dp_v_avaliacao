import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FunctionType } from "../enum/function-type.enum";

@Entity()
export class Creator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: FunctionType })
  function: FunctionType;

  @Column()
  contributions: string;
}