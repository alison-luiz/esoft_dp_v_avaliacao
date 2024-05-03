import { Serie } from "../../series/entities/serie.entity";
import { ICreator } from "../creator.controller";
import { Creator } from "../entities/creator.entity";

interface IViewCreatorDto {
  id: number;
  name: string;
  role: string;
  serieId: number;
  creatorId: number;
  thumbnail: string;
  thumbnailExtension: string;
  serie: Serie;
}

class ViewCreatorDto {
  static build(creator: Creator, filteredCreator: ICreator, serie: Serie): IViewCreatorDto {
    return {
      id: creator.id,
      name: creator.name,
      role: creator.role,
      thumbnail: filteredCreator.thumbnail,
      thumbnailExtension: filteredCreator.thumbnailExtension,
      serieId: creator.serieId,
      serie: serie,
      creatorId: creator.creatorId,
    }
  }
}

export default ViewCreatorDto;