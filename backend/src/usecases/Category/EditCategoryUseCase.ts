import { CategoryRepository } from "../../repositories/CategoryRepository";

interface EditCategoryInput {
  id: number;
  name: string;
}

export class EditCategoryUseCase {
  async execute(data: EditCategoryInput): Promise<void> {
    const { id, name } = data;

    const category = await CategoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error("Categoria não encontrada.");
    }

    const categoryExists = await CategoryRepository.findOneBy({ name });
    if (categoryExists && categoryExists.id !== id) {
      throw new Error("Já existe uma categoria com este nome.");
    }

    category.name = name;
    await CategoryRepository.save(category);
  }
}
