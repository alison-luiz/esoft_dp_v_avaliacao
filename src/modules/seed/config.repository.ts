import { AppDataSource } from "../../shared/database/database.config";
import { Config } from "./entities/config.entity";

export const configRepository = AppDataSource.getRepository(Config);