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
    categoryController = new CategoryController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should create a category successfully', async () => {
    const mockCategory = { id: 1, name: 'Category 1' };

    // Mockando o comportamento do CreateCategoryUseCase
    (CreateCategoryUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockCategory),
    }));

    req.body = { name: 'Category 1' };

    await categoryController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  it('should list categories successfully', async () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];

    // Mockando o comportamento do ListCategoriesUseCase
    (ListCategoriesUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockCategories),
    }));

    await categoryController.list(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategories);
  });

  it('should edit a category successfully', async () => {
    const mockResponse = { message: 'Categoria atualizada com sucesso.' };

    // Mockando o comportamento do EditCategoryUseCase
    (EditCategoryUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),
    }));

    req.params = { id: '1' };
    req.body = { name: 'Updated Category' };

    await categoryController.edit(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should delete a category successfully', async () => {
    const mockResponse = { message: 'Categoria excluída com sucesso.' };

    // Mockando o comportamento do DeleteCategoryUseCase
    (DeleteCategoryUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),
    }));

    req.params = { id: '1' };

    await categoryController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should return 400 when an error occurs during create', async () => {
    const error = new Error('Error creating category');
    (CreateCategoryUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    req.body = { name: 'Category 1' };

    await categoryController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
