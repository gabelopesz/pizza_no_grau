import { CategoryRepository } from "../../../infraestructure/repositories/CategoryRepository.js";

export const listCategories = async () => {
  const repository = new CategoryRepository();
  return await repository.list();
};
