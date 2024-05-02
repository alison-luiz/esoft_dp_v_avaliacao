import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../../shared/helpers/api-erros";
import { MARVEL_API_URL } from "../../shared/utils/constants";
import { Character } from "../characters/entities/character.entity";
import { Comic } from "../comics/entities/comic.entity";
import { Creator } from "../creators/entities/creator.entity";
import { Serie } from "../series/entities/serie.entity";
import { serieRepository } from "../series/serie.repository";

interface ISeries {
  serieId: number;
  title: string;
  description: string;
  startYear: number;
  endYear: number;
  thumbnailPath: string;
  creators: ICreator[];
  characters: ICharacter[];
  comics: IComic[];
}

interface ICreator {
  resourceURI: string;
  name: string;
  role: string;
  serieId: number;
  creatorId: number;
}

interface ICharacter {
  resourceURI: string;
  name: string;
  role: string;
  serieId: number;
  characterId: number;
}

interface IComic {
  resourceURI: string;
  name: string;
  role: string;
  serieId: number;
  comicId: number;
}

export class SeedController {
  constructor() {
    this.seed = this.seed.bind(this);
    this.getHashMD5 = this.getHashMD5.bind(this);
  }

  async reset(req: Request, res: Response, next: NextFunction) {
    const queryRunner = serieRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Serie, {});
      await queryRunner.manager.delete(Creator, {});
      await queryRunner.manager.delete(Character, {});
      await queryRunner.manager.delete(Comic, {});

      await queryRunner.commitTransaction();

      res.json({ message: "Database reset" });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      next(error);
    } finally {
      await queryRunner.release();
    }
  }

  async seed(req: Request, res: Response, next: NextFunction) {
    const seriesSeed = await serieRepository.find();

    if (seriesSeed.length > 0) {
      throw new BadRequestError("Database already seeded");
    }

    const queryRunner = serieRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { your_public_key, your_private_key, saga } = req.body;

      if (!your_public_key || !your_private_key || !saga) {
        throw new BadRequestError("Missing required fields");
      }

      const ts = "1";
      const hash = this.getHashMD5(ts, your_public_key, your_private_key);

      const seriesResponse = await fetch(
        `${MARVEL_API_URL}/series?ts=${ts}&apikey=${your_public_key}&hash=${hash}&titleStartsWith=${saga}&limit=100`
      );
      const seriesData = await seriesResponse.json();

      if (!isSeriesData(seriesData)) {
        throw new NotFoundError("Invalid series data");
      }

      const filteredSeries: ISeries[] = seriesData.data.results.map(
        (series: any) => {
          const filteredCreators: ICreator[] = series.creators.items.map(
            (creator: any) => ({
              resourceURI: creator.resourceURI,
              name: creator.name,
              role: creator.role,
              serieId: series.id,
              creatorId: Number(creator.resourceURI.split("/").pop()),
            })
          );

          const filteredCharacters: ICharacter[] = series.characters.items.map(
            (character: any) => ({
              resourceURI: character.resourceURI,
              name: character.name,
              serieId: series.id,
              characterId: Number(character.resourceURI.split("/").pop()),
            })
          );

          const filteredComics: IComic[] = series.comics.items.map(
            (comic: any) => ({
              resourceURI: comic.resourceURI,
              name: comic.name,
              serieId: series.id,
              comicId: Number(comic.resourceURI.split("/").pop()),
            })
          );

          return {
            serieId: series.id,
            title: series.title,
            description: series.description,
            startYear: series.startYear,
            endYear: series.endYear,
            thumbnailPath: series.thumbnail.path,
            creators: filteredCreators,
            characters: filteredCharacters,
            comics: filteredComics,
          };
        }
      );

      for (const serie of filteredSeries) {
        await queryRunner.manager.save(Serie, {
          serieId: serie.serieId,
          title: serie.title,
          description: serie.description,
          startYear: serie.startYear,
          endYear: serie.endYear,
          thumbnailPath: serie.thumbnailPath,
        });

        for (const creator of serie.creators) {
          const existingCreator = await queryRunner.manager.findOne(Creator, {
            where: { creatorId: creator.creatorId, serieId: creator.serieId }
          });
        
          if (!existingCreator || existingCreator.role !== creator.role) {
            await queryRunner.manager.save(Creator, {
              resourceURI: creator.resourceURI,
              name: creator.name,
              role: creator.role,
              serieId: creator.serieId,
              creatorId: creator.creatorId,
            });
          }
        }
        
        for (const character of serie.characters) {
          const existingCharacter = await queryRunner.manager.findOne(Character, {
            where: { characterId: character.characterId }
          });
        
          if (!existingCharacter) {
            await queryRunner.manager.save(Character, {
              resourceURI: character.resourceURI,
              name: character.name,
              serieId: character.serieId,
              characterId: character.characterId,
            });
          }
        }        

        for (const comic of serie.comics) {
          const existingComic = await queryRunner.manager.findOne(Comic, {
            where: { comicId: comic.comicId }
          });
        
          if (!existingComic) {
            await queryRunner.manager.save(Comic, {
              resourceURI: comic.resourceURI,
              name: comic.name,
              serieId: comic.serieId,
              comicId: comic.comicId,
            });
          }
        }        
      }

      await queryRunner.commitTransaction();

      res.json(filteredSeries);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      next(error);
    } finally {
      await queryRunner.release();
    }
  }

  private getHashMD5(
    ts: string,
    publicKey: string,
    privateKey: string
  ): string {
    const crypto = require("crypto");
    const stringHash = `${ts}${privateKey}${publicKey}`;
    const hash = crypto.createHash("md5");
    hash.update(stringHash);

    return hash.digest("hex");
  }
}

function isSeriesData(data: any): data is { data: { results: any[] } } {
  return (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof data.data === "object" &&
    data.data !== null &&
    "results" in data.data &&
    Array.isArray(data.data.results)
  );
}
