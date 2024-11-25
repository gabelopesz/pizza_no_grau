import { UserRepository } from "../../../infraestructure/repositories/UserRepository.js";

export const editUser = async (id, updatedData) => {
  const repository = new UserRepository();
  return await repository.update(id, updatedData); 
};
