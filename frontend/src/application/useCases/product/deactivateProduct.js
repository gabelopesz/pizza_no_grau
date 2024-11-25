import { ProductRepository } from "../../../infraestructure/repositories/ProductRepository.js";

export const deactivateProduct = async (id) => {
  const repository = new ProductRepository();
  await repository.deactivate(id);
};
