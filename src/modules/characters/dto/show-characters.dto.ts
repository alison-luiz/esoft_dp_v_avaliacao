import { Character } from "../entities/character.entity";

interface IShowCharactersDto {
  id: number;
  name: string;
  resourceURI: string;
  seriesIds: number[];
  characterId: number;
}

class ShowCharactersDto {
  static build(character: Character): IShowCharactersDto {
    return {
      id: character.id,
      name: character.name,
      resourceURI: character.resourceURI,
      seriesIds: character.seriesIds.split(',').map(id => parseInt(id)),
      characterId: character.characterId,
    }
  }
}

export default ShowCharactersDto;