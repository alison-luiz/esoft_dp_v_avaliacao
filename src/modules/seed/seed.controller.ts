import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../shared/helpers/api-erros";
import { MARVEL_API_URL } from "../../shared/utils/constants";

export class SeedController {
  async seed(req: Request, res: Response, next: NextFunction) {
    try {
      const { your_public_key, your_private_key, saga } = req.body;

      if (!your_public_key || !your_private_key || !saga) {
        throw new BadRequestError("Missing required fields");
      }

      const crypto = require('crypto');
      const stringHash = `1${your_private_key}${your_public_key}`
      const hash = crypto.createHash('md5');
      hash.update(stringHash);

      const hashHex = hash.digest('hex');

      const series = await fetch(`${MARVEL_API_URL}/series?ts=1&apikey=${your_public_key}&hash=${hashHex}&titleStartsWith=${saga}&limit=100`);

      series.json().then((series) => {
        res.json(series);
      });

    } catch (error) {
      next(error);
    }
  }

}