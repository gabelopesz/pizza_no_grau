import { UserRepository } from "../../repositories/UserRepository";

interface EditUserInput {
  id: number;
  name?: string;
  email?: string;
}

export class EditUserUseCase {
  async execute(data: EditUserInput): Promise<void> {
    const user = await UserRepository.findOneBy({ id: data.id });
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (data.email && data.email !== user.email) {
      const emailInUse = await UserRepository.findOneBy({ email: data.email });
      if (emailInUse) {
        throw new Error("Email já em uso.");
      }
    }

    Object.assign(user, data);
    await UserRepository.save(user);
  }
}
