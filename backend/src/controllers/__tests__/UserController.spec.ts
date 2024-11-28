import { UserController } from "../UserController";
import { Request, Response } from "express";
import { CreateUserUseCase } from "../../usecases/User/CreateUserUseCase";
import { ListUsersUseCase } from "../../usecases/User/ListUsersUseCase";
import { EditUserUseCase } from "../../usecases/User/EditUserUseCase";
import { ChangeUserStatusUseCase } from "../../usecases/User/ChangeUserStatusUseCase";

// Mockar as dependências dos use cases
jest.mock("../../usecases/User/CreateUserUseCase");
jest.mock("../../usecases/User/ListUsersUseCase");
jest.mock("../../usecases/User/EditUserUseCase");
jest.mock("../../usecases/User/ChangeUserStatusUseCase");

describe('UserController', () => {
  let userController: UserController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    userController = new UserController();  // Inicializa o controlador de usuários antes de cada teste
    req = {};  // Inicializa o objeto `req` (requisição) vazio
    res = {
      status: jest.fn().mockReturnThis(),  // Mock do método `status` da resposta
      json: jest.fn().mockReturnThis(),    // Mock do método `json` da resposta
    };
  });

  it('should create a user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };

    // Mockando o comportamento do CreateUserUseCase
    (CreateUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockUser),  // Simula a resolução do `execute` com o usuário mockado
    }));

    req.body = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };  // Define os dados do usuário

    await userController.create(req as Request, res as Response);  // Chama o método `create` do controlador de usuários

    // Verifica se o status 201 (Created) foi retornado
    expect(res.status).toHaveBeenCalledWith(201);
    // Verifica se o usuário mockado foi retornado como resposta
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should list users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];

    // Mockando o comportamento do ListUsersUseCase
    (ListUsersUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockUsers),  // Simula a resolução do `execute` com a lista de usuários mockada
    }));

    req.query = { onlyActive: "true" };  // Define o parâmetro `onlyActive` na requisição (para filtrar usuários ativos)

    await userController.list(req as Request, res as Response);  // Chama o método `list` do controlador de usuários

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a lista de usuários foi retornada corretamente
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('should edit a user successfully', async () => {
    const mockResponse = { message: 'Usuário atualizado com sucesso.' };

    // Mockando o comportamento do EditUserUseCase
    (EditUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),  // Simula a resolução do `execute` com a mensagem de sucesso
    }));

    req.params = { id: '1' };  // Define o parâmetro `id` na URL da requisição (ID do usuário a ser editado)
    req.body = { name: 'Updated John Doe', email: 'updated.john.doe@example.com' };  // Define os dados atualizados do usuário

    await userController.edit(req as Request, res as Response);  // Chama o método `edit` do controlador de usuários

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should deactivate a user successfully', async () => {
    const mockResponse = { message: 'Usuário desativado com sucesso.' };

    // Mockando o comportamento do ChangeUserStatusUseCase
    (ChangeUserStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),  // Simula a resolução do `execute` com a mensagem de sucesso
    }));

    req.params = { id: '1' };  // Define o parâmetro `id` na URL da requisição (ID do usuário a ser desativado)

    await userController.deactivate(req as Request, res as Response);  // Chama o método `deactivate` do controlador de usuários

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should activate a user successfully', async () => {
    const mockResponse = { message: 'Usuário ativado com sucesso.' };

    // Mockando o comportamento do ChangeUserStatusUseCase
    (ChangeUserStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),  // Simula a resolução do `execute` com a mensagem de sucesso
    }));

    req.params = { id: '1' };  // Define o parâmetro `id` na URL da requisição (ID do usuário a ser ativado)

    await userController.activate(req as Request, res as Response);  // Chama o método `activate` do controlador de usuários

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should return 400 when an error occurs during create', async () => {
    const error = new Error('Error creating user');

    // Mockando o comportamento do CreateUserUseCase para simular falha na criação do usuário
    (CreateUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),  // Simula a rejeição do `execute` com o erro
    }));

    req.body = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };  // Define os dados do usuário

    await userController.create(req as Request, res as Response);  // Chama o método `create` do controlador de usuários

    // Verifica se o status 400 (Bad Request) foi retornado
    expect(res.status).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
