import { ProductRepository } from "../../../infraestructure/repositories/ProductRepository.js";

export const activateProduct = async (id) => {
  const repository = new ProductRepository();
  await repository.activate(id);
};
