import { UserRepository } from "../../../infraestructure/repositories/UserRepository.js";

export const listUsers = async () => {
  const repository = new UserRepository();
  return await repository.list();
};
