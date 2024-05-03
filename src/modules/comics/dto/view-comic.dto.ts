import { Serie } from "../../series/entities/serie.entity";
import { IComic } from "../comic.controller";
import { Comic } from "../entities/comic.entity";

interface IViewComicDto {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  thumbnailExtension: string;
  serieId: number;
  serie: Serie;
  comicId: number;
}

class ViewComicDto {
  static build(comic: Comic, filteredComic: IComic, serie: Serie): IViewComicDto {
    return {
      id: comic.id,
      name: comic.name,
      description: filteredComic.description,
      thumbnail: filteredComic.thumbnail,
      thumbnailExtension: filteredComic.thumbnailExtension,
      serieId: comic.serieId,
      serie: serie,
      comicId: comic.comicId,
    }
  }
}

export default ViewComicDto;