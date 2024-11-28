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
    userController = new UserController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should create a user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };

    // Mockando o comportamento do CreateUserUseCase
    (CreateUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockUser),
    }));

    req.body = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };

    await userController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should list users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];

    // Mockando o comportamento do ListUsersUseCase
    (ListUsersUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockUsers),
    }));

    req.query = { onlyActive: "true" };

    await userController.list(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('should edit a user successfully', async () => {
    const mockResponse = { message: 'Usuário atualizado com sucesso.' };

    // Mockando o comportamento do EditUserUseCase
    (EditUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),
    }));

    req.params = { id: '1' };
    req.body = { name: 'Updated John Doe', email: 'updated.john.doe@example.com' };

    await userController.edit(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should deactivate a user successfully', async () => {
    const mockResponse = { message: 'Usuário desativado com sucesso.' };

    // Mockando o comportamento do ChangeUserStatusUseCase
    (ChangeUserStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),
    }));

    req.params = { id: '1' };

    await userController.deactivate(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should activate a user successfully', async () => {
    const mockResponse = { message: 'Usuário ativado com sucesso.' };

    // Mockando o comportamento do ChangeUserStatusUseCase
    (ChangeUserStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),
    }));

    req.params = { id: '1' };

    await userController.activate(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should return 400 when an error occurs during create', async () => {
    const error = new Error('Error creating user');
    (CreateUserUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    req.body = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };

    await userController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
