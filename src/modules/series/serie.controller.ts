import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../shared/helpers/api-erros";
import { serieRepository } from "./serie.repository";

export class SerieController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const series = await serieRepository.find();

      if (!series) {
        throw new NotFoundError("Series not found");
      }

      res.status(200).json(series);
    } catch (error) {
      next(error);
    }
  }
}
