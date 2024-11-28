import { ProductRepository } from "../ProductRepository";
import { Product } from "../../entities/Product";
import { AppDataSource } from "../../config/database";

// Mockando o AppDataSource e os repositórios
jest.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('ProductRepository', () => {
  let productRepository: any;

  beforeEach(() => {
    // Criando mocks para os métodos do repositório
    productRepository = {
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock do AppDataSource.getRepository para retornar o repositório mockado de Product
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity: any) => {
      if (entity === Product) return productRepository; // Retorna o mock de ProductRepository
    });
  });

  it('should find all products successfully', async () => {
    const mockProducts = [new Product(), new Product()]; // Usando instâncias completas de Product
    productRepository.find.mockResolvedValue(mockProducts);

    // Chamando o repositório mockado corretamente
    const result = await productRepository.find();

    expect(productRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });

  it('should save a product successfully', async () => {
    const mockProduct = new Product(); // Usando instância completa de Product
    productRepository.save.mockResolvedValue(mockProduct);

    const result = await productRepository.save(mockProduct);

    expect(productRepository.save).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
  });

  it('should remove a product successfully', async () => {
    const mockProduct = new Product(); // Usando instância completa de Product
    productRepository.remove.mockResolvedValue(mockProduct);

    const result = await productRepository.remove(mockProduct);

    expect(productRepository.remove).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
  });
});
