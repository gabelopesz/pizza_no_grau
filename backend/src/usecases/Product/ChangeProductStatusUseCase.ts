import { ProductRepository } from "../../repositories/ProductRepository";

export class ChangeProductStatusUseCase {
  async execute(id: number, isActive: boolean): Promise<void> {
    const product = await ProductRepository.findOneBy({ id });
    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    product.isActive = isActive;
    await ProductRepository.save(product);
  }
}
