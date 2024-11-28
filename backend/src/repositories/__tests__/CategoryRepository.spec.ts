import { CategoryRepository } from "../CategoryRepository";
import { Category } from "../../entities/Category";
import { AppDataSource } from "../../config/database";

// Mockando o AppDataSource e os repositórios
jest.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('CategoryRepository', () => {
  let categoryRepository: any;

  beforeEach(() => {
    // Criando mocks para os métodos do repositório
    categoryRepository = {
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock do AppDataSource.getRepository para retornar o repositório mockado de Category
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity: any) => {
      if (entity === Category) return categoryRepository; // Retorna o mock de CategoryRepository
    });
  });

  it('should find all categories successfully', async () => {
    const mockCategories = [new Category(), new Category()]; // Usando instâncias completas de Category
    categoryRepository.find.mockResolvedValue(mockCategories);

    // Chamando o repositório mockado corretamente
    const result = await categoryRepository.find();

    expect(categoryRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockCategories);
  });

  it('should save a category successfully', async () => {
    const mockCategory = new Category(); // Usando instância completa de Category
    categoryRepository.save.mockResolvedValue(mockCategory);

    const result = await categoryRepository.save(mockCategory);

    expect(categoryRepository.save).toHaveBeenCalledWith(mockCategory);
    expect(result).toEqual(mockCategory);
  });

  it('should remove a category successfully', async () => {
    const mockCategory = new Category(); // Usando instância completa de Category
    categoryRepository.remove.mockResolvedValue(mockCategory);

    const result = await categoryRepository.remove(mockCategory);

    expect(categoryRepository.remove).toHaveBeenCalledWith(mockCategory);
    expect(result).toEqual(mockCategory);
  });
});
