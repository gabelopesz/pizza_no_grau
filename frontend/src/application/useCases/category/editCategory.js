import { CategoryRepository } from "../../../infraestructure/repositories/CategoryRepository.js";

export const editCategory = async (id, updatedCategory) => {
  const repository = new CategoryRepository();
  return await repository.update(id, updatedCategory);
};
