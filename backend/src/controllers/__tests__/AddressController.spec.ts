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
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should create an address successfully", async () => {
    const mockAddress = { id: 1, street: "Main St", city: "Springfield" };
    const createAddressUseCaseMock = CreateAddressUseCase.prototype.execute as jest.Mock;
    createAddressUseCaseMock.mockResolvedValue(mockAddress);

    req.params = { userId: "1" };
    req.body = { street: "Main St", city: "Springfield" };

    await AddressController.create(req as Request, res as Response);

    expect(createAddressUseCaseMock).toHaveBeenCalledWith(1, req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAddress);
  });

  it("should return error when creating an address fails", async () => {
    const errorMessage = "Error creating address";
    const createAddressUseCaseMock = CreateAddressUseCase.prototype.execute as jest.Mock;
    createAddressUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { userId: "1" };
    req.body = { street: "Main St", city: "Springfield" };

    await AddressController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should list user addresses successfully", async () => {
    const mockAddresses = [{ id: 1, street: "Main St", city: "Springfield" }];
    const listUserAddressesUseCaseMock = ListUserAddressesUseCase.prototype.execute as jest.Mock;
    listUserAddressesUseCaseMock.mockResolvedValue(mockAddresses);

    req.params = { userId: "1" };

    await AddressController.list(req as Request, res as Response);

    expect(listUserAddressesUseCaseMock).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAddresses);
  });

  it("should return error when listing user addresses fails", async () => {
    const errorMessage = "Error listing addresses";
    const listUserAddressesUseCaseMock = ListUserAddressesUseCase.prototype.execute as jest.Mock;
    listUserAddressesUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { userId: "1" };

    await AddressController.list(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should find address by ID successfully", async () => {
    const mockAddress = { id: 1, street: "Main St", city: "Springfield" };
    const findAddressByIdUseCaseMock = FindAddressByIdUseCase.prototype.execute as jest.Mock;
    findAddressByIdUseCaseMock.mockResolvedValue(mockAddress);

    req.params = { userId: "1", addressId: "1" };

    await AddressController.findById(req as Request, res as Response);

    expect(findAddressByIdUseCaseMock).toHaveBeenCalledWith(1, 1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAddress);
  });

  it("should return error when finding address by ID fails", async () => {
    const errorMessage = "Address not found";
    const findAddressByIdUseCaseMock = FindAddressByIdUseCase.prototype.execute as jest.Mock;
    findAddressByIdUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { userId: "1", addressId: "1" };

    await AddressController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should delete address successfully", async () => {
    const deleteAddressUseCaseMock = DeleteAddressUseCase.prototype.execute as jest.Mock;
    deleteAddressUseCaseMock.mockResolvedValue(undefined);

    req.params = { userId: "1", addressId: "1" };

    await AddressController.delete(req as Request, res as Response);

    expect(deleteAddressUseCaseMock).toHaveBeenCalledWith(1, 1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Endereço deletado com sucesso." });
  });

  it("should return error when deleting address fails", async () => {
    const errorMessage = "Error deleting address";
    const deleteAddressUseCaseMock = DeleteAddressUseCase.prototype.execute as jest.Mock;
    deleteAddressUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { userId: "1", addressId: "1" };

    await AddressController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
