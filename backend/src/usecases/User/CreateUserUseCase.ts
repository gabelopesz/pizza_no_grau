import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";

interface UserInput {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async execute(data: UserInput): Promise<User> {
    const { name, email, password } = data;

    // Verifica se o email já está em uso
    const existingUser = await UserRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error("Email já está em uso.");
    }

    const user = UserRepository.create({
      name,
      email,
      password,
      isActive: true,
    });

    return await UserRepository.save(user);
  }
}
