import { AppDataSource } from "../../shared/database/database.config";
import { Character } from "./entities/character.entity";

export const characterRepository = AppDataSource.getRepository(Character);