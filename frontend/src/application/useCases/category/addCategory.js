import { CategoryRepository } from "../../../infraestructure/repositories/CategoryRepository.js";

export const addCategory = async (category) => {
  const repository = new CategoryRepository();
  return await repository.add(category);
};