import { Comic } from "../../comics/entities/comic.entity";
import { Creator } from "../../creators/entities/creator.entity";
import { Serie } from "../../series/entities/serie.entity";
import { ICharacter } from "../character.controller";
import { Character } from "../entities/character.entity";

interface IViewCharacterDto {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  thumbnailExtension: string;
  seriesIds: number[];
  series: Serie[];
  comics: Comic[];
  creators: Creator[];
  characterId: number;
}

class ViewCharacterDto {
  static build(character: Character, filteredCharacter: ICharacter, series: Serie[], comics: Comic[], creators: Creator[]): IViewCharacterDto {
    return {
      id: character.id,
      name: character.name,
      description: filteredCharacter.description,
      thumbnail: filteredCharacter.thumbnail,
      thumbnailExtension: filteredCharacter.thumbnailExtension,
      seriesIds: character.seriesIds.split(',').map(id => parseInt(id)),
      series: series,
      comics: comics,
      creators: creators,
      characterId: character.characterId,
    }
  }
}

export default ViewCharacterDto;