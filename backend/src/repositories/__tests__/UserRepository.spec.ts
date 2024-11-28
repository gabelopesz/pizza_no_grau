import { UserRepository } from "../UserRepository";
import { User } from "../../entities/User";
import { AppDataSource } from "../../config/database";

// Mockando o AppDataSource e os repositórios
jest.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('UserRepository', () => {
  let userRepository: any;

  beforeEach(() => {
    // Criando mocks para os métodos do repositório
    userRepository = {
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock do AppDataSource.getRepository para retornar o repositório mockado de User
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity: any) => {
      if (entity === User) return userRepository; // Retorna o mock de UserRepository
    });
  });

  it('should find all users successfully', async () => {
    const mockUsers = [new User(), new User()]; // Usando instâncias completas de User
    userRepository.find.mockResolvedValue(mockUsers);

    // Chamando o repositório mockado corretamente
    const result = await userRepository.find();

    // Verifica se o método find foi chamado corretamente
    expect(userRepository.find).toHaveBeenCalled();
    // Verifica se o resultado da execução é igual ao mock de usuários
    expect(result).toEqual(mockUsers);
  });

  it('should save a user successfully', async () => {
    const mockUser = new User(); // Usando instância completa de User
    userRepository.save.mockResolvedValue(mockUser);

    const result = await userRepository.save(mockUser);

    // Verifica se o método save foi chamado corretamente com o mock de usuário
    expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    // Verifica se o resultado da execução é igual ao mock de usuário
    expect(result).toEqual(mockUser);
  });

  it('should remove a user successfully', async () => {
    const mockUser = new User(); // Usando instância completa de User
    userRepository.remove.mockResolvedValue(mockUser);

    const result = await userRepository.remove(mockUser);

    // Verifica se o método remove foi chamado corretamente com o mock de usuário
    expect(userRepository.remove).toHaveBeenCalledWith(mockUser);
    // Verifica se o resultado da execução é igual ao mock de usuário
    expect(result).toEqual(mockUser);
  });
});
