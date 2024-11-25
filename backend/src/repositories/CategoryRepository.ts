import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Category } from "../entities/Category";

export const CategoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
