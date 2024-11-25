import { UserRepository } from "../../../infraestructure/repositories/UserRepository.js";

export const addUser = async (user) => {
  const repository = new UserRepository();
  return await repository.add(user);
};
