import { AppDataSource } from "../../shared/database/database.config";
import { Comic } from "./entities/comic.entity";

export const comicRepository = AppDataSource.getRepository(Comic);