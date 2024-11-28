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
    productController = new ProductController();  // Inicializa o controlador de produtos antes de cada teste
    req = {};  // Inicializa o objeto `req` (requisição) vazio
    res = {
      status: jest.fn().mockReturnThis(),  // Mock do método `status` da resposta
      json: jest.fn().mockReturnThis(),    // Mock do método `json` da resposta
    };
  });

  it('should create a product successfully', async () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 };

    // Mockando o comportamento do CreateProductUseCase
    (CreateProductUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockProduct),  // Simula a resolução do `execute` com o produto mockado
    }));

    req.body = { name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 };  // Define os dados do produto

    await productController.create(req as Request, res as Response);  // Chama o método `create` do controlador de produtos

    // Verifica se o status 201 (Created) foi retornado
    expect(res.status).toHaveBeenCalledWith(201);
    // Verifica se o produto mockado foi retornado como resposta
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should list products successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 },
      { id: 2, name: 'Product 2', price: 150, description: 'Another great product', categoryId: 2 },
    ];

    // Mockando o comportamento do ListProductsUseCase
    (ListProductsUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockProducts),  // Simula a resolução do `execute` com a lista de produtos mockada
    }));

    req.query = { onlyActive: "true" };  // Define o parâmetro `onlyActive` na requisição (para filtrar produtos ativos)

    await productController.list(req as Request, res as Response);  // Chama o método `list` do controlador de produtos

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a lista de produtos foi retornada corretamente
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  it('should show product details successfully', async () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 };

    // Mockando o comportamento do GetProductByIdUseCase
    (GetProductByIdUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockProduct),  // Simula a resolução do `execute` com o produto mockado
    }));

    req.params = { id: '1' };  // Define o parâmetro `id` na URL da requisição (ID do produto)

    await productController.show(req as Request, res as Response);  // Chama o método `show` do controlador de produtos

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se os detalhes do produto foram retornados corretamente
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should edit a product successfully', async () => {
    const mockResponse = { message: 'Produto atualizado com sucesso.' };

    // Mockando o comportamento do EditProductUseCase
    (EditProductUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),  // Simula a resolução do `execute` com a mensagem de sucesso
    }));

    req.params = { id: '1' };  // Define o parâmetro `id` na URL da requisição (ID do produto a ser editado)
    req.body = { name: 'Updated Product', price: 120, description: 'Updated description', categoryId: 2 };  // Define os dados atualizados do produto

    await productController.edit(req as Request, res as Response);  // Chama o método `edit` do controlador de produtos

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should deactivate a product successfully', async () => {
    const mockResponse = { message: 'Produto desativado com sucesso.' };

    // Mockando o comportamento do ChangeProductStatusUseCase
    (ChangeProductStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),  // Simula a resolução do `execute` com a mensagem de sucesso
    }));

    req.params = { id: '1' };  // Define o parâmetro `id` na URL da requisição (ID do produto a ser desativado)

    await productController.deactivate(req as Request, res as Response);  // Chama o método `deactivate` do controlador de produtos

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should activate a product successfully', async () => {
    const mockResponse = { message: 'Produto ativado com sucesso.' };

    // Mockando o comportamento do ChangeProductStatusUseCase
    (ChangeProductStatusUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockResponse),  // Simula a resolução do `execute` com a mensagem de sucesso
    }));

    req.params = { id: '1' };  // Define o parâmetro `id` na URL da requisição (ID do produto a ser ativado)

    await productController.activate(req as Request, res as Response);  // Chama o método `activate` do controlador de produtos

    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should return 400 when an error occurs during create', async () => {
    const error = new Error('Error creating product');

    // Mockando o comportamento do CreateProductUseCase para simular falha na criação do produto
    (CreateProductUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),  // Simula a rejeição do `execute` com o erro
    }));

    req.body = { name: 'Product 1', price: 100, description: 'A great product', categoryId: 1 };  // Define os dados do produto

    await productController.create(req as Request, res as Response);  // Chama o método `create` do controlador de produtos

    // Verifica se o status 400 (Bad Request) foi retornado
    expect(res.status).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
