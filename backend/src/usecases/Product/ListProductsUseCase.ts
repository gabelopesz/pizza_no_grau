import { ProductRepository } from "../../repositories/ProductRepository";
import { Product } from "../../entities/Product";

export class ListProductsUseCase {
  async execute(onlyActive: boolean = true): Promise<Product[]> {
    if (onlyActive) {
      return await ProductRepository.findBy({ isActive: true });
    }
    return await ProductRepository.find();
  }
}
