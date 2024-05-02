import { Comic } from "../../comics/entities/comic.entity";
import { Creator } from "../../creators/entities/creator.entity";
import { Serie } from "../../series/entities/serie.entity";
import { ICharacter } from "../character.controller";
import { Character } from "../entities/character.entity";

interface IViewCharacterDto {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  seriesIds: number[];
  series: Serie[];
  comics: Comic[];
  creators: Creator[];
  characterId: number;
  resourceURI: string;
}

class ViewCharacterDto {
  static build(character: Character, filteredCharacter: ICharacter, series: Serie[], comics: Comic[], creators: Creator[]): IViewCharacterDto {
    return {
      id: character.id,
      name: character.name,
      description: filteredCharacter.description,
      thumbnail: {
        path: filteredCharacter.thumbnail.path,
        extension: filteredCharacter.thumbnail.extension,
      },
      seriesIds: character.seriesIds.split(',').map(id => parseInt(id)),
      series: series,
      comics: comics,
      creators: creators,
      characterId: character.characterId,
      resourceURI: character.resourceURI,
    }
  }
}

export default ViewCharacterDto;