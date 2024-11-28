import { CategoryController } from "../../controllers/CategoryController";
import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../../usecases/Category/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "../../usecases/Category/ListCategoriesUseCase";
import { EditCategoryUseCase } from "../../usecases/Category/EditCategoryUseCase";
import { DeleteCategoryUseCase } from "../../usecases/Category/DeleteCategoryUseCase";

// Mockar as dependências dos use cases
jest.mock("../../usecases/Category/CreateCategoryUseCase");
jest.mock("../../usecases/Category/ListCategoriesUseCase");
jest.mock("../../usecases/Category/EditCategoryUseCase");
jest.mock("../../usecases/Category/DeleteCategoryUseCase");

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    categoryController = new CategoryController(); // Inicializa o controlador de categoria antes de cada teste
    req = {};  // Inicializa o objeto `req` (requisição) vazio
    res = {
      status: jest.fn().mockReturnThis(),  // Mock do método `status` da resposta
      json: jest.fn().mockReturnThis(),    // Mock do método `json` da resposta
    };
  });

  it('should create a category successfully', async () => {
    const mockCategory = { id: 1, name: 'Category 1' };  // Mock da categoria criada

    // Mock do comportamento do CreateCategoryUseCase
    (CreateCategoryUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockCategory),  // Simula a resolução do `execute` com a categoria mockada
    }));

    req.body = { name: 'Category 1' };  // Define o corpo da requisição com os dados da categoria

    // Chama o método `create` do controlador de categorias
    await categoryController.create(req as Request, res as Response);

    // Verifica se o status 201 (criado) foi retornado
    expect(res.status).toHaveBeenCalledWith(201);
    // Verifica se a resposta retornou a categoria criada
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  it('should list categories successfully', async () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];  // Mock das categorias listadas

    // Mock do comportamento do ListCategoriesUseCase
    (ListCategoriesUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockCategories),  // Simula a resolução do `execute` com a lista de categorias mockada
    }));

    // Chama o método `list` do controlador de categorias
    await categoryController.list(req as Request, res as Response);

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a lista de categorias foi retornada corretamente
    expect(res.json).toHaveBeenCalledWith(mockCategories);
  });

  it('should edit a category successfully', async () => {
    const mockResponse = { message: 'Categoria atualizada com sucesso.' };  // Mock da resposta de sucesso da atualização

    // Mock do comportamento do EditCategoryUseCase
    (EditCategoryUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),  // Simula a resolução do `execute` com a mensagem de sucesso
    }));

    req.params = { id: '1' };  // Parâmetro `id` na URL
    req.body = { name: 'Updated Category' };  // Define o corpo da requisição com o novo nome da categoria

    // Chama o método `edit` do controlador de categorias
    await categoryController.edit(req as Request, res as Response);

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should delete a category successfully', async () => {
    const mockResponse = { message: 'Categoria excluída com sucesso.' };  // Mock da resposta de sucesso da exclusão

    // Mock do comportamento do DeleteCategoryUseCase
    (DeleteCategoryUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),  // Simula a resolução do `execute` com a mensagem de sucesso
    }));

    req.params = { id: '1' };  // Parâmetro `id` da categoria na URL

    // Chama o método `delete` do controlador de categorias
    await categoryController.delete(req as Request, res as Response);

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should return 400 when an error occurs during create', async () => {
    const error = new Error('Error creating category');  // Mock do erro que ocorre durante a criação

    // Mock do comportamento do CreateCategoryUseCase para simular falha
    (CreateCategoryUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),  // Simula a rejeição do `execute` com o erro mockado
    }));

    req.body = { name: 'Category 1' };  // Define o corpo da requisição com os dados da categoria

    // Chama o método `create` do controlador de categorias
    await categoryController.create(req as Request, res as Response);

    // Verifica se o status 400 (Bad Request) foi retornado
    expect(res.status).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
