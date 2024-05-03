import { NextFunction, Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import { NotFoundError } from "../../shared/helpers/api-erros";
import { isValidData } from "../../shared/helpers/valid-marvel-response.helper";
import { MARVEL_API_URL } from "../../shared/utils/constants";
import { configRepository } from "../seed/config.repository";
import { serieRepository } from "../series/serie.repository";
import { creatorRepository } from "./creator.repository";
import { QueryGetAllDto } from "./dto/query-get-all.dto";
import ViewCreatorDto from "./dto/view-creator.dto";

export interface ICreator {
  thumbnail: string;
  thumbnailExtension: string;
}

export class CreatorController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let options: FindManyOptions<QueryGetAllDto> = {};

      Object.keys(req.query).forEach((param) => {
        options.where = { ...options.where, [param]: req.query[param] };
      });

      const creators = await creatorRepository.find(options);

      if (!creators || creators.length === 0) {
        throw new NotFoundError("Creators not found");
      }

      res.status(200).json(creators);
    } catch (error) {
      next(error);
    }
  }

  async getRolesTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const creators = await creatorRepository.find();

      if (!creators || creators.length === 0) {
        throw new NotFoundError("Creators not found");
      }

      const roles = creators.map((creator) => creator.role);
      const rolesTypes = [...new Set(roles)];

      res.status(200).json(rolesTypes);
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

      const creator = await creatorRepository.findOne({
        where: { id: Number(id) },
      });

      if (!creator) {
        throw new NotFoundError("Creator not found");
      }

      let filteredCreator: ICreator[] = [];

      if (creator.hasFetchData === false) {
        const response = await fetch(
          `${MARVEL_API_URL}/creators/${creator.creatorId}?apikey=${config[0].your_public_key}&hash=${config[0].hash}&ts=${config[0].ts}`
        );
        const creatorMarvel = await response.json();

        if (!isValidData(creatorMarvel)) {
          throw new NotFoundError("Creator not found in Marvel API");
        }

        filteredCreator = creatorMarvel.data.results.map((creator: any) => ({
          thumbnail: creator.thumbnail.path,
          thumbnailExtension: creator.thumbnail.extension,
        }));

        await creatorRepository.update(creator.id, {
          hasFetchData: true,
          thumbnail: filteredCreator[0].thumbnail,
          thumbnailExtension: filteredCreator[0].thumbnailExtension,
        });

        creator.thumbnail = filteredCreator[0].thumbnail;
        creator.thumbnailExtension = filteredCreator[0].thumbnailExtension;
      } else {
        filteredCreator = [
          {
            thumbnail: creator.thumbnail,
            thumbnailExtension: creator.thumbnailExtension,
          },
        ];
      }

      const serie = await serieRepository.find({
        where: { serieId: creator.serieId },
      });

      const creatorMarvelDto = ViewCreatorDto.build(creator, filteredCreator[0], serie[0]);

      res.status(200).json(creatorMarvelDto);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, role, serieId, thumbnail, thumbnailExtension } = req.body;

      if (!name || !role || !serieId || !thumbnail || !thumbnailExtension) {
        throw new NotFoundError("Missing required fields");
      }

      const serieExists = await serieRepository.findOne({
        where: { serieId: serieId },
      });

      if (!serieExists) {
        throw new NotFoundError("Serie not found");
      }

      let creatorId;

      do {
        creatorId = Math.floor(Math.random() * 1000000);
      } while (await creatorRepository.findOne({ where: { creatorId } }));

      const creator = await creatorRepository.save({
        creatorId: creatorId,
        name,
        role,
        hasFetchData: true,
        serieId,
        thumbnail,
        thumbnailExtension,
      });

      res.status(201).json(creator);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { name, role, serieId, thumbnail, thumbnailExtension } = req.body;

      if (!name || !role || !serieId || !thumbnail || !thumbnailExtension) {
        throw new NotFoundError("Missing required fields");
      }

      const serieExists = await serieRepository.findOne({
        where: { serieId: serieId },
      });

      if (!serieExists) {
        throw new NotFoundError("Serie not found");
      }

      const creator = await creatorRepository.findOne({
        where: { id: Number(id) },
      });

      if (!creator) {
        throw new NotFoundError("Creator not found");
      }

      creator.name = name;
      creator.role = role;
      creator.serieId = serieId;
      creator.thumbnail = thumbnail;
      creator.thumbnailExtension = thumbnailExtension;
      
      await creatorRepository.save(creator);

      res.status(200).json(creator);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const creator = await creatorRepository.findOne({
        where: { id: Number(id) },
      });

      if (!creator) {
        throw new NotFoundError("Creator not found");
      }

      await creatorRepository.delete(creator.id);

      res.status(200).json({ message: "Creator deleted" });
    } catch (error) {
      next(error);
    }
  }
}
