import { IsOptional } from "class-validator";

export class QuerySeriesGetAllDto {
  @IsOptional()
  startYear: number;

  @IsOptional()
  endYear: number;
}