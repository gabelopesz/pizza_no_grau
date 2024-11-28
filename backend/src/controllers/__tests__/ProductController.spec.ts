import { ProductController } from "../ProductController";
import { Request, Response } from "express";
import { CreateProductUseCase } from "../../usecases/Product/CreateProductUseCase";
import { ListProductsUseCase } from "../../usecases/Product/ListProductsUseCase";
import { EditProductUseCase } from "../../usecases/Product/EditProductUseCase";
import { ChangeProductStatusUseCase } from "../../usecases/Product/ChangeProductStatusUseCase";
import { GetProductByIdUseCase } from "../../usecases/Product/GetProductByIdUseCase";


// Mockar as dependências dos use cases
jest.mock("../../usecases/Product/CreateProductUseCase");
jest.mock("../../usecases/Product/ListProductsUseCase");
jest.mock("../../usecases/Product/EditProductUseCase");
jest.mock("../../usecases/Product/ChangeProductStatusUseCase");
jest.mock("../../usecases/Product/GetProductByIdUseCase");

describe('ProductController', () => {
  let productController: ProductController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    productController = new ProductController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should create a product successfully', async () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 };

    // Mockando o comportamento do CreateProductUseCase
    (CreateProductUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockProduct),
    }));

    req.body = { name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 };

    await productController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should list products successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 },
      { id: 2, name: 'Product 2', price: 150, description: 'Another great product', categoryId: 2 },
    ];

    // Mockando o comportamento do ListProductsUseCase
    (ListProductsUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockProducts),
    }));

    req.query = { onlyActive: "true" };

    await productController.list(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  it('should show product details successfully', async () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 };

    // Mockando o comportamento do GetProductByIdUseCase
    (GetProductByIdUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockProduct),
    }));

    req.params = { id: '1' };

    await productController.show(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should edit a product successfully', async () => {
    const mockResponse = { message: 'Produto atualizado com sucesso.' };

    // Mockando o comportamento do EditProductUseCase
    (EditProductUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),
    }));

    req.params = { id: '1' };
    req.body = { name: 'Updated Product', price: 120, description: 'Updated description', categoryId: 2 };

    await productController.edit(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should deactivate a product successfully', async () => {
    const mockResponse = { message: 'Produto desativado com sucesso.' };

    // Mockando o comportamento do ChangeProductStatusUseCase
    (ChangeProductStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),
    }));

    req.params = { id: '1' };

    await productController.deactivate(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should activate a product successfully', async () => {
    const mockResponse = { message: 'Produto ativado com sucesso.' };

    // Mockando o comportamento do ChangeProductStatusUseCase
    (ChangeProductStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),
    }));

    req.params = { id: '1' };

    await productController.activate(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should return 400 when an error occurs during create', async () => {
    const error = new Error('Error creating product');
    (CreateProductUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    req.body = { name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 };

    await productController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
