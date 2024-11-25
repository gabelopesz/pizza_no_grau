import { ProductRepository } from "../../../infraestructure/repositories/ProductRepository.js";

export const updateProduct = async (id, data) => {
  const repository = new ProductRepository();
  return await repository.update(id, data);
};
