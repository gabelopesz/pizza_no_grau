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
    addressRepository.find.mockResolvedValue(mockAddresses);  // Mockando a resolução do método `find`

    const result = await addressRepository.find();  // Chama o método `find`

    expect(addressRepository.find).toHaveBeenCalled();  // Verifica se o método `find` foi chamado
    expect(result).toEqual(mockAddresses);  // Verifica se o resultado é igual ao valor mockado
  });

  it("should save an address successfully", async () => {
    const mockAddress = new Address();  // Usando instância completa de Address
    addressRepository.save.mockResolvedValue(mockAddress);  // Mockando a resolução do método `save`

    const result = await addressRepository.save(mockAddress);  // Chama o método `save` com o endereço mockado

    expect(addressRepository.save).toHaveBeenCalledWith(mockAddress);  // Verifica se o método `save` foi chamado com o endereço correto
    expect(result).toEqual(mockAddress);  // Verifica se o resultado é igual ao endereço mockado
  });

  it("should remove an address successfully", async () => {
    const mockAddress = new Address();  // Usando instância completa de Address
    addressRepository.remove.mockResolvedValue(mockAddress);  // Mockando a resolução do método `remove`

    const result = await addressRepository.remove(mockAddress);  // Chama o método `remove` com o endereço mockado

    expect(addressRepository.remove).toHaveBeenCalledWith(mockAddress);  // Verifica se o método `remove` foi chamado com o endereço correto
    expect(result).toEqual(mockAddress);  // Verifica se o resultado é igual ao endereço mockado
  });
});
