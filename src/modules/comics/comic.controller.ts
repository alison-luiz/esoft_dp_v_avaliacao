import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../shared/helpers/api-erros";
import { comicRepository } from "./comic.repository";

export class ComicController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const comics = await comicRepository.find();

      if (!comics) {
        throw new NotFoundError("Comics not found");
      }

      res.status(200).json(comics);
    } catch (error) {
      next(error);
    }
  }
}
