import { AddressController } from "../AddressController";
import { Request, Response } from "express";
import { CreateAddressUseCase } from "../../usecases/Address/CreateAddressUseCase";
import { ListUserAddressesUseCase } from "../../usecases/Address/ListUserAddressesUseCase";
import { FindAddressByIdUseCase } from "../../usecases/Address/FindAddressByIdUseCase";
import { DeleteAddressUseCase } from "../../usecases/Address/DeleteAddressUseCase";

// Mockando os use cases
jest.mock("../../usecases/Address/CreateAddressUseCase");
jest.mock("../../usecases/Address/ListUserAddressesUseCase");
jest.mock("../../usecases/Address/FindAddressByIdUseCase");
jest.mock("../../usecases/Address/DeleteAddressUseCase");

describe("AddressController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    // Configurações antes de cada teste, inicializando `req`, `res` e `next`
    req = {};
    res = {
      status: jest.fn().mockReturnThis(), // Mock do método `status` do Response
      json: jest.fn().mockReturnThis(),   // Mock do método `json` do Response
    };
    next = jest.fn(); // Mock do `next`, caso seja necessário para middlewares
  });

  it("should create an address successfully", async () => {
    // Mock para o caso de sucesso da criação de um endereço
    const mockAddress = { id: 1, street: "Main St", city: "Springfield" };
    const createAddressUseCaseMock = CreateAddressUseCase.prototype.execute as jest.Mock;
    createAddressUseCaseMock.mockResolvedValue(mockAddress);

    req.params = { userId: "1" };
    req.body = { street: "Main St", city: "Springfield" };

    // Chama o método `create` do controlador
    await AddressController.create(req as Request, res as Response);

    // Verifica se o use case foi chamado com os parâmetros corretos
    expect(createAddressUseCaseMock).toHaveBeenCalledWith(1, req.body);
    // Verifica se o status 201 foi retornado
    expect(res.status).toHaveBeenCalledWith(201);
    // Verifica se o endereço foi retornado como resposta
    expect(res.json).toHaveBeenCalledWith(mockAddress);
  });

  it("should return error when creating an address fails", async () => {
    // Mock para o caso de falha na criação de um endereço
    const errorMessage = "Error creating address";
    const createAddressUseCaseMock = CreateAddressUseCase.prototype.execute as jest.Mock;
    createAddressUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { userId: "1" };
    req.body = { street: "Main St", city: "Springfield" };

    // Chama o método `create` do controlador
    await AddressController.create(req as Request, res as Response);

    // Verifica se o status 400 foi retornado
    expect(res.status).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should list user addresses successfully", async () => {
    // Mock para o caso de sucesso de listar endereços de um usuário
    const mockAddresses = [{ id: 1, street: "Main St", city: "Springfield" }];
    const listUserAddressesUseCaseMock = ListUserAddressesUseCase.prototype.execute as jest.Mock;
    listUserAddressesUseCaseMock.mockResolvedValue(mockAddresses);

    req.params = { userId: "1" };

    // Chama o método `list` do controlador
    await AddressController.list(req as Request, res as Response);

    // Verifica se o use case foi chamado com o ID do usuário
    expect(listUserAddressesUseCaseMock).toHaveBeenCalledWith(1);
    // Verifica se o status 200 foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a lista de endereços foi retornada como resposta
    expect(res.json).toHaveBeenCalledWith(mockAddresses);
  });

  it("should return error when listing user addresses fails", async () => {
    // Mock para o caso de falha ao listar endereços de um usuário
    const errorMessage = "Error listing addresses";
    const listUserAddressesUseCaseMock = ListUserAddressesUseCase.prototype.execute as jest.Mock;
    listUserAddressesUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { userId: "1" };

    // Chama o método `list` do controlador
    await AddressController.list(req as Request, res as Response);

    // Verifica se o status 400 foi retornado
    expect(res.status).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should find address by ID successfully", async () => {
    // Mock para o caso de sucesso de encontrar um endereço pelo ID
    const mockAddress = { id: 1, street: "Main St", city: "Springfield" };
    const findAddressByIdUseCaseMock = FindAddressByIdUseCase.prototype.execute as jest.Mock;
    findAddressByIdUseCaseMock.mockResolvedValue(mockAddress);

    req.params = { userId: "1", addressId: "1" };

    // Chama o método `findById` do controlador
    await AddressController.findById(req as Request, res as Response);

    // Verifica se o use case foi chamado com o ID do endereço e do usuário
    expect(findAddressByIdUseCaseMock).toHaveBeenCalledWith(1, 1);
    // Verifica se o status 200 foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se o endereço foi retornado como resposta
    expect(res.json).toHaveBeenCalledWith(mockAddress);
  });

  it("should return error when finding address by ID fails", async () => {
    // Mock para o caso de falha ao encontrar um endereço pelo ID
    const errorMessage = "Address not found";
    const findAddressByIdUseCaseMock = FindAddressByIdUseCase.prototype.execute as jest.Mock;
    findAddressByIdUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { userId: "1", addressId: "1" };

    // Chama o método `findById` do controlador
    await AddressController.findById(req as Request, res as Response);

    // Verifica se o status 404 foi retornado (não encontrado)
    expect(res.status).toHaveBeenCalledWith(404);
    // Verifica se a mensagem de erro foi retornada
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should delete address successfully", async () => {
    // Mock para o caso de sucesso na exclusão de um endereço
    const deleteAddressUseCaseMock = DeleteAddressUseCase.prototype.execute as jest.Mock;
    deleteAddressUseCaseMock.mockResolvedValue(undefined);

    req.params = { userId: "1", addressId: "1" };

    // Chama o método `delete` do controlador
    await AddressController.delete(req as Request, res as Response);

    // Verifica se o use case foi chamado com os IDs corretos
    expect(deleteAddressUseCaseMock).toHaveBeenCalledWith(1, 1);
    // Verifica se o status 200 foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith({ message: "Endereço deletado com sucesso." });
  });

  it("should return error when deleting address fails", async () => {
    // Mock para o caso de falha ao excluir um endereço
    const errorMessage = "Error deleting address";
    const deleteAddressUseCaseMock = DeleteAddressUseCase.prototype.execute as jest.Mock;
    deleteAddressUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { userId: "1", addressId: "1" };

    // Chama o método `delete` do controlador
    await AddressController.delete(req as Request, res as Response);

    // Verifica se o status 404 foi retornado (não encontrado)
    expect(res.status).toHaveBeenCalledWith(404);
    // Verifica se a mensagem de erro foi retornada
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
