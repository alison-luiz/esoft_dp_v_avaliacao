import { NextFunction, Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import { BadRequestError, NotFoundError } from "../../shared/helpers/api-erros";
import { QuerySeriesGetAllDto } from "./dto/query-get-all.dto";
import { serieRepository } from "./serie.repository";

export class SerieController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let options: FindManyOptions<QuerySeriesGetAllDto> = {};

      Object.keys(req.query).forEach((param) => {
        options.where = { ...options.where, [param]: req.query[param] };
      });

      const series = await serieRepository.find(options);

      if (!series || series.length === 0) {
        throw new NotFoundError("Series not found");
      }

      res.status(200).json(series);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, startYear, endYear, thumbnail, thumbnailExtension } = req.body;

      if (!title || !description || !startYear || !endYear || !thumbnail || !thumbnailExtension) {
        throw new BadRequestError("Missing required fields");
      }
      
      let serieId;

      do {
        serieId = Math.floor(Math.random() * 1000000);
      } while (await serieRepository.findOne({ where: { serieId } }));

      const serie = await serieRepository.save({
        serieId: serieId,
        title,
        description,
        startYear,
        endYear,
        thumbnail,
        thumbnailExtension,
      });

      res.status(201).json(serie);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { title, description, startYear, endYear, thumbnail, thumbnailExtension } = req.body;

      if (!title || !description || !startYear || !endYear || !thumbnail || !thumbnailExtension) {
        throw new BadRequestError("Missing required fields");
      }

      const serie = await serieRepository.findOne({
        where: { id: Number(id) },
      });

      if (!serie) {
        throw new NotFoundError("Serie not found");
      }

      serie.title = title;
      serie.description = description;
      serie.startYear = startYear;
      serie.endYear = endYear;
      serie.thumbnail = thumbnail;
      serie.thumbnailExtension = thumbnailExtension;

      await serieRepository.save(serie);

      res.status(200).json(serie);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const serie = await serieRepository.findOne({
        where: { id: Number(id) },
      });

      if (!serie) {
        throw new NotFoundError("Serie not found");
      }

      await serieRepository.delete(serie);

      res.status(200).json({ message: "Serie deleted" });
    } catch (error) {
      next(error);
    }
  }
}
