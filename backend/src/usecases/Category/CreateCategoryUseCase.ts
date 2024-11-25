import { CategoryRepository } from "../../repositories/CategoryRepository";
import { Category } from "../../entities/Category";

interface CreateCategoryInput {
  name: string;
}

export class CreateCategoryUseCase {
  async execute(data: CreateCategoryInput): Promise<Category> {
    const { name } = data;

    const categoryExists = await CategoryRepository.findOneBy({ name });
    if (categoryExists) {
      throw new Error("Categoria já existe.");
    }

    const category = CategoryRepository.create({ name });
    return await CategoryRepository.save(category);
  }
}
