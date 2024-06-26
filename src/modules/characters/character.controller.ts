import { NextFunction, Request, Response } from "express";
import { In } from "typeorm";
import { BadRequestError, NotFoundError } from "../../shared/helpers/api-erros";
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
  thumbnail: string;
  thumbnailExtension: string;
}

export class CharacterController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const characters = await characterRepository.find();

      if (!characters || characters.length === 0) {
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
    try {
      const config = await configRepository.find();

      if (!config || config.length === 0) {
        throw new NotFoundError("Config not found, please run seed first");
      }

      const { id } = req.params;

      const character = await characterRepository.findOne({
        where: { id: Number(id) },
      });

      if (!character) {
        throw new NotFoundError("Character not found");
      }

      let filteredCharacter: ICharacter[] = [];

      if (character.hasFetchData === false) {
        const response = await fetch(
          `${MARVEL_API_URL}/characters/${character.characterId}?apikey=${config[0].your_public_key}&hash=${config[0].hash}&ts=${config[0].ts}`
        );
        const characterMarvel = await response.json();

        if (!isValidData(characterMarvel)) {
          throw new NotFoundError("Character not found in Marvel API");
        }

        filteredCharacter = characterMarvel.data.results.map(
          (character: any) => ({
            description: character.description,
            thumbnail: character.thumbnail.path,
            thumbnailExtension: character.thumbnail.extension,
          })
        );

        await characterRepository.update(character.id, {
          hasFetchData: true,
          description: filteredCharacter[0].description,
          thumbnail: filteredCharacter[0].thumbnail,
          thumbnailExtension: filteredCharacter[0].thumbnailExtension,
        });

        character.description = filteredCharacter[0].description;
        character.thumbnail = filteredCharacter[0].thumbnail;
        character.thumbnailExtension = filteredCharacter[0].thumbnailExtension;
      } else {
        filteredCharacter = [
          {
            description: character.description,
            thumbnail: character.thumbnail,
            thumbnailExtension: character.thumbnailExtension,
          },
        ];
      }

      const seriesIds = character.seriesIds
        .split(",")
        .map((id) => parseInt(id));

      const series = await serieRepository.find({
        where: { serieId: In(seriesIds) },
      });

      const comics = await comicRepository.find({
        where: { serieId: In(seriesIds) },
      });

      const creators = await creatorRepository.find({
        where: {
          serieId: In(seriesIds),
        },
      });

      const characterMarvelDto = ViewCharacterDto.build(
        character,
        filteredCharacter[0],
        series,
        comics,
        creators
      );

      res.status(200).json(characterMarvelDto);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, seriesIds, description, thumbnail, thumbnailExtension } = req.body;

      if (!name || !seriesIds || !description || !thumbnail || !thumbnailExtension) {
        throw new BadRequestError("Missing required fields");
      }

      const seriesIdsArray = seriesIds.split(",").map((id: string) => parseInt(id));

      const seriesExists = await serieRepository.find({
        where: { serieId: In(seriesIdsArray) },
      });

      if (seriesExists.length !== seriesIdsArray.length) {
        throw new NotFoundError("Series not found");
      }

      let characterId;

      do {
        characterId = Math.floor(Math.random() * 1000000);
      } while (await characterRepository.findOne({ where: { characterId } }));

      const character = await characterRepository.save({
        name,
        seriesIds,
        hasFetchData: true,
        characterId: characterId,
        description,
        thumbnail,
        thumbnailExtension,
      });

      res.status(201).json(character);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { name, seriesIds, description, thumbnail, thumbnailExtension } = req.body;

      if (!name || !seriesIds || !description || !thumbnail || !thumbnailExtension) {
        throw new BadRequestError("Missing required fields");
      }

      const seriesIdsArray = seriesIds.split(",").map((id: string) => parseInt(id));

      const seriesExists = await serieRepository.find({
        where: { serieId: In(seriesIdsArray) },
      });

      if (seriesExists.length !== seriesIdsArray.length) {
        throw new NotFoundError("Series not found");
      }

      const character = await characterRepository.findOne({
        where: { id: Number(id) },
      });

      if (!character) {
        throw new NotFoundError("Character not found");
      }

      character.name = name;
      character.seriesIds = seriesIds;
      character.description = description;
      character.thumbnail = thumbnail;
      character.thumbnailExtension = thumbnailExtension;

      await characterRepository.save(character);

      res.status(200).json(character);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const character = await characterRepository.findOne({
        where: { id: Number(id) },
      });

      if (!character) {
        throw new NotFoundError("Character not found");
      }

      await characterRepository.delete(character.id);

      res.status(200).json({ message: "Character deleted" });
    } catch (error) {
      next(error);
    }
  }
}
