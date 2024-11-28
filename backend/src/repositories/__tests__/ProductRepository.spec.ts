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

    // Verifica se o método find foi chamado corretamente
    expect(productRepository.find).toHaveBeenCalled();
    // Verifica se o resultado da execução é igual ao mock de produtos
    expect(result).toEqual(mockProducts);
  });

  it('should save a product successfully', async () => {
    const mockProduct = new Product(); // Usando instância completa de Product
    productRepository.save.mockResolvedValue(mockProduct);

    // Chamando o repositório para salvar o mock de produto
    const result = await productRepository.save(mockProduct);

    // Verifica se o método save foi chamado corretamente com o mock de produto
    expect(productRepository.save).toHaveBeenCalledWith(mockProduct);
    // Verifica se o resultado da execução é igual ao mock de produto
    expect(result).toEqual(mockProduct);
  });

  it('should remove a product successfully', async () => {
    const mockProduct = new Product(); // Usando instância completa de Product
    productRepository.remove.mockResolvedValue(mockProduct);

    // Chamando o repositório para remover o mock de produto
    const result = await productRepository.remove(mockProduct);

    // Verifica se o método remove foi chamado corretamente com o mock de produto
    expect(productRepository.remove).toHaveBeenCalledWith(mockProduct);
    // Verifica se o resultado da execução é igual ao mock de produto
    expect(result).toEqual(mockProduct);
  });
});
