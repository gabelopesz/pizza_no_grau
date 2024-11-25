import { ProductRepository } from "../../repositories/ProductRepository";
import { Category } from "../../entities/Category";

interface EditProductInput {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  imageUrl?: string; // Adicionado campo para manipulação de imagens
}

export class EditProductUseCase {
  async execute(data: EditProductInput): Promise<void> {
    const { id, categoryId, ...rest } = data;

    // Busca o produto pelo ID
    const product = await ProductRepository.findOneBy({ id });
    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    // Se categoryId for fornecido, verifica se a categoria existe
    if (categoryId) {
      const category = await ProductRepository.manager.findOne(Category, {
        where: { id: categoryId },
      });
      if (!category) {
        throw new Error("Categoria não encontrada.");
      }
      product.category = category; // Atualiza a categoria do produto
    }

    // Atualiza os campos do produto (incluindo imageUrl)
    Object.assign(product, rest);

    // Salva as alterações no banco de dados
    await ProductRepository.save(product);
  }
}
