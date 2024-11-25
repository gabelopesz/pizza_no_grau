import { UserRepository } from "../../repositories/UserRepository";

export class ChangeUserStatusUseCase {
  async execute(id: number, isActive: boolean): Promise<void> {
    const user = await UserRepository.findOneBy({ id });
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    user.isActive = isActive;
    await UserRepository.save(user);
  }
}
