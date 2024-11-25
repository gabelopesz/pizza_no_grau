import { ProductRepository } from "../../repositories/ProductRepository";

interface EditProductInput {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  categoryId?: number;
}

export class EditProductUseCase {
  async execute(data: EditProductInput): Promise<void> {
    const product = await ProductRepository.findOneBy({ id: data.id });
    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    Object.assign(product, data);
    await ProductRepository.save(product);
  }
}
