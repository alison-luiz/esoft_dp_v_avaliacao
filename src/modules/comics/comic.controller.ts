import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../shared/helpers/api-erros";
import { isValidData } from "../../shared/helpers/valid-marvel-response.helper";
import { MARVEL_API_URL } from "../../shared/utils/constants";
import { configRepository } from "../seed/config.repository";
import { serieRepository } from "../series/serie.repository";
import { comicRepository } from "./comic.repository";
import ViewComicDto from "./dto/view-comic.dto";

export interface IComic {
  description: string;
  thumbnail: string;
  thumbnailExtension: string;
}

export class ComicController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const comics = await comicRepository.find();

      if (!comics || comics.length === 0) {
        throw new NotFoundError("Comics not found");
      }

      res.status(200).json(comics);
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

      const comic = await comicRepository.findOne({
        where: { id: Number(id) },
      });

      if (!comic) {
        throw new NotFoundError("Comic not found");
      }

      let filteredComic: IComic[] = [];

      if (comic.hasFetchData === false) {
        const response = await fetch(
          `${MARVEL_API_URL}/comics/${comic.comicId}?apikey=${config[0].your_public_key}&hash=${config[0].hash}&ts=${config[0].ts}`
        );
        const comicMarvel = await response.json();

        if (!isValidData(comicMarvel)) {
          throw new NotFoundError("Comic not found in Marvel API");
        }

        filteredComic = comicMarvel.data.results.map((comic: any) => ({
          description: comic.description,
          thumbnail: comic.thumbnail.path,
          thumbnailExtension: comic.thumbnail.extension,
        }));

        await comicRepository.update(comic.id, {
          hasFetchData: true,
          description: filteredComic[0].description,
          thumbnail: filteredComic[0].thumbnail,
          thumbnailExtension: filteredComic[0].thumbnailExtension,
        });

        comic.description = filteredComic[0].description;
        comic.thumbnail = filteredComic[0].thumbnail;
        comic.thumbnailExtension = filteredComic[0].thumbnailExtension;
      } else {
        filteredComic = [
          {
            description: comic.description,
            thumbnail: comic.thumbnail,
            thumbnailExtension: comic.thumbnailExtension,
          },
        ];
      }

      const serie = await serieRepository.find({
        where: { serieId: comic.serieId },
      });

      const comicMarvelDto = ViewComicDto.build(comic, filteredComic[0], serie[0]);

      res.status(200).json(comicMarvelDto);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, serieId, description, thumbnail, thumbnailExtension } = req.body;

      if (!name || !serieId || !description || !thumbnail || !thumbnailExtension) {
        throw new NotFoundError("Missing required fields");
      }

      const serieExists = await serieRepository.findOne({
        where: { serieId: serieId },
      });

      if (!serieExists) {
        throw new NotFoundError("Serie not found");
      }

      let comicId;

      do {
        comicId = Math.floor(Math.random() * 1000000);
      } while (await comicRepository.findOne({ where: { comicId } }));

      const comic = await comicRepository.save({
        comicId: comicId,
        name,
        serieId,
        hasFetchData: true,
        description,
        thumbnail,
        thumbnailExtension,
      });

      res.status(201).json(comic);      
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { name, serieId, description, thumbnail, thumbnailExtension } = req.body;

      if (!name || !serieId || !description || !thumbnail || !thumbnailExtension) {
        throw new NotFoundError("Missing required fields");
      }

      const comic = await comicRepository.findOne({
        where: { id: Number(id) },
      });

      if (!comic) {
        throw new NotFoundError("Comic not found");
      }

      comic.name = name;
      comic.serieId = serieId;
      comic.description = description;
      comic.thumbnail = thumbnail;
      comic.thumbnailExtension = thumbnailExtension;

      await comicRepository.save(comic);

      res.status(200).json(comic);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const comic = await comicRepository.findOne({
        where: { id: Number(id) },
      });

      if (!comic) {
        throw new NotFoundError("Comic not found");
      }

      await comicRepository.delete(comic.id);

      res.status(200).json({ message: "Comic deleted" });
    } catch (error) {
      next(error);
    }
  }
}
