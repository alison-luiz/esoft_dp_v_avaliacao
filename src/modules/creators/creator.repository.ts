import { AppDataSource } from "../../shared/database/database.config";
import { Creator } from "./entities/creator.entity";

export const creatorRepository = AppDataSource.getRepository(Creator);