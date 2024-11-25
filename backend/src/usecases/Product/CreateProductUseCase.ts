import { ProductRepository } from "../../repositories/ProductRepository";
import { Product } from "../../entities/Product";
import { Category } from "../../entities/Category";

interface ProductInput {
  name: string;
  price: number;
  description: string;
  categoryId?: number; // Categoria opcional
}

export class CreateProductUseCase {
  async execute(data: ProductInput): Promise<Product> {
    const { name, price, description, categoryId } = data;

    // Verifica se a categoria existe (caso fornecida)
    let category: Category | null = null;
    if (categoryId) {
      category = await ProductRepository.manager.findOne(Category, { where: { id: categoryId } });
      if (!category) {
        throw new Error("Categoria não encontrada");
      }
    }

    // Cria e salva o produto
    const product = ProductRepository.create({
      name,
      price,
      description,
      isActive: true,
      category: category || undefined, // Converte null para undefined
    });

    return await ProductRepository.save(product);
  }
}
