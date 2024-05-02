import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../shared/helpers/api-erros";
import { creatorRepository } from "./creator.repository";

export class CreatorController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const creators = await creatorRepository.find();

      if (!creators) {
        throw new NotFoundError("Creators not found");
      }

      res.status(200).json(creators);
    } catch (error) {
      next(error);
    }
  }
}
