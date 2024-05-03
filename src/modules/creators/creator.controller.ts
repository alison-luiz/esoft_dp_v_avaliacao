import { NextFunction, Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import { NotFoundError } from "../../shared/helpers/api-erros";
import { creatorRepository } from "./creator.repository";
import { QueryGetAllDto } from "./dto/query-get-all.dto";

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
}
