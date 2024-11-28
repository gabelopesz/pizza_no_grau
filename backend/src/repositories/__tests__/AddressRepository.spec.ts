import { AddressRepository } from "../AddressRepository";
import { Address } from "../../entities/Address";
import { AppDataSource } from "../../config/database";

// Mockando o AppDataSource e os repositórios
jest.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe("AddressRepository", () => {
  let addressRepository: any;

  beforeEach(() => {
    // Criando mocks para os métodos do repositório
    addressRepository = {
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock do AppDataSource.getRepository para retornar o repositório mockado de Address
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity: any) => {
      if (entity === Address) return addressRepository; // Retorna o mock de AddressRepository
    });
  });

  it("should find all addresses successfully", async () => {
    const mockAddresses = [new Address(), new Address()]; // Usando instâncias completas de Address
    addressRepository.find.mockResolvedValue(mockAddresses);

    const result = await addressRepository.find();

    expect(addressRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockAddresses);
  });

  it("should save an address successfully", async () => {
    const mockAddress = new Address(); // Usando instância completa de Address
    addressRepository.save.mockResolvedValue(mockAddress);

    const result = await addressRepository.save(mockAddress);

    expect(addressRepository.save).toHaveBeenCalledWith(mockAddress);
    expect(result).toEqual(mockAddress);
  });

  it("should remove an address successfully", async () => {
    const mockAddress = new Address(); // Usando instância completa de Address
    addressRepository.remove.mockResolvedValue(mockAddress);

    const result = await addressRepository.remove(mockAddress);

    expect(addressRepository.remove).toHaveBeenCalledWith(mockAddress);
    expect(result).toEqual(mockAddress);
  });
});
