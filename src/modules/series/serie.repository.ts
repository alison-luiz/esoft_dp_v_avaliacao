import { AppDataSource } from "../../shared/database/database.config";
import { Serie } from "./entities/serie.entity";

export const serieRepository = AppDataSource.getRepository(Serie);