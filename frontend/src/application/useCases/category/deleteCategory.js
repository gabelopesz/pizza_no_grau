import { CategoryRepository } from "../../../infraestructure/repositories/CategoryRepository.js";

export const deleteCategory = async (id) => {
  const repository = new CategoryRepository();
  return await repository.delete(id);
};