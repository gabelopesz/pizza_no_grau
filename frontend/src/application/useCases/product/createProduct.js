import { ProductRepository } from "../../../infraestructure/repositories/ProductRepository.js";

export const createProduct = async (data) => {
  const repository = new ProductRepository();
  return await repository.add(data);
};
