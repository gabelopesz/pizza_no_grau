import { UserRepository } from "../../../infraestructure/repositories/UserRepository.js";

export const activateUser = async (id) => {
  const repository = new UserRepository();
  await repository.activate(id);
};
