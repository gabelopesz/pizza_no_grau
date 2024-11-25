import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";

export class ListUsersUseCase {
  async execute(onlyActive: boolean = true): Promise<User[]> {
    if (onlyActive) {
      return await UserRepository.findBy({ isActive: true });
    }
    return await UserRepository.find(); 
  }
}
