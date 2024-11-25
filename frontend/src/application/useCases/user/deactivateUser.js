import { UserRepository } from "../../../infraestructure/repositories/UserRepository.js";

export const deactivateUser = async (id) => {
  const repository = new UserRepository();
  await repository.deactivate(id);
};
