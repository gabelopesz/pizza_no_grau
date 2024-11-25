import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ProductRepository } from "../../repositories/ProductRepository";

export class DeleteCategoryUseCase {
  async execute(id: number): Promise<void> {
    const category = await CategoryRepository.findOneBy({ id });

    if (!category) {
      throw new Error("Categoria não encontrada.");
    }

    const productsInCategory = await ProductRepository.countBy({ category });
    if (productsInCategory > 0) {
      throw new Error("Não é possível excluir categorias que possuem produtos associados.");
    }

    await CategoryRepository.remove(category);
  }
}
