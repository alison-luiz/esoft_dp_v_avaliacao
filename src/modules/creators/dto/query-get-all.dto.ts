import { IsOptional } from "class-validator";

export class QueryGetAllDto {
  @IsOptional()
  name: string;

  @IsOptional()
  role: string;
}