import { ProductRepository } from "../../repositories/ProductRepository";

class GetProductByIdUseCase {
  async execute(id: number) {
    // Busca o produto pelo ID usando o repositório
    const product = await ProductRepository.findOneBy({ id });

    // Verifica se o produto existe
    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }
}

export { GetProductByIdUseCase };
