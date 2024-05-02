import { NextFunction, Request, Response } from "express";
import { In, Like } from "typeorm";
import { NotFoundError } from "../../shared/helpers/api-erros";
import { isValidData } from "../../shared/helpers/valid-marvel-response.helper";
import { MARVEL_API_URL } from "../../shared/utils/constants";
import { comicRepository } from "../comics/comic.repository";
import { creatorRepository } from "../creators/creator.repository";
import { configRepository } from "../seed/config.repository";
import { serieRepository } from "../series/serie.repository";
import { characterRepository } from "./character.repository";
import ShowCharactersDto from "./dto/show-characters.dto";
import ViewCharacterDto from "./dto/view-character.dto";

export interface ICharacter {
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export class CharacterController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const characters = await characterRepository.find();

      if (!characters) {
        throw new NotFoundError("Characters not found");
      }

      const charactersDto = [];

      for (const character of characters) {
        charactersDto.push(ShowCharactersDto.build(character));
      }

      res.status(200).json(charactersDto);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const config = await configRepository.find();

    if (!config) {
      throw new NotFoundError("Config not found");
    }

    try {
      const { id } = req.params;

      const character = await characterRepository.findOne({
        where: { id: Number(id) },
      });

      if (!character) {
        throw new NotFoundError("Character not found");
      }

      const characterMarvelResponse = await fetch(
        `${MARVEL_API_URL}/characters/${character.characterId}?apikey=${config[0].your_public_key}&hash=${config[0].hash}&ts=${config[0].ts}`
      );
      const characterMarvel = await characterMarvelResponse.json();

      if (!isValidData(characterMarvel)) {
        throw new NotFoundError("Character not found in Marvel API");
      }

      const filteredCharacter: ICharacter[] = characterMarvel.data.results.map(
        (character: any) => ({
          description: character.description,
          thumbnail: character.thumbnail,
        })
      );

      const seriesIds = character.seriesIds.split(",").map((id) => parseInt(id));

      const series = await serieRepository.find({
        where: { serieId: In(seriesIds) },
      });

      const comics = await comicRepository.find({
        where: { serieId: In(seriesIds) },
      });

      const creators = await creatorRepository.find({
        where: {
          seriesIds: Like(`%${seriesIds}%`),
        }
      });

      const characterMarvelDto = ViewCharacterDto.build(character, filteredCharacter[0], series, comics, creators);

      res.status(200).json(characterMarvelDto);
    } catch (error) {
      next(error);
    }
  }
}
