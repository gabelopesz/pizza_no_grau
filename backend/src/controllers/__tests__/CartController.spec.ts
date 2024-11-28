import { CartController } from "../CartController";
import { Request, Response } from "express";
import { AddProductToCartUseCase } from "../../usecases/Cart/AddProductToCartUseCase";
import { RemoveProductFromCartUseCase } from "../../usecases/Cart/RemoveProductFromCartUseCase";
import { UpdateCartItemQuantityUseCase } from "../../usecases/Cart/UpdateCartItemQuantityUseCase";
import { ClearCartUseCase } from "../../usecases/Cart/ClearCartUseCase";
import { GetCartUseCase } from "../../usecases/Cart/GetCartUseCase";
import { ConvertCartToOrderUseCase } from "../../usecases/Cart/ConvertCartToOrderUseCase";

// Mockando os use cases
jest.mock("../../usecases/Cart/AddProductToCartUseCase");
jest.mock("../../usecases/Cart/RemoveProductFromCartUseCase");
jest.mock("../../usecases/Cart/UpdateCartItemQuantityUseCase");
jest.mock("../../usecases/Cart/ClearCartUseCase");
jest.mock("../../usecases/Cart/GetCartUseCase");
jest.mock("../../usecases/Cart/ConvertCartToOrderUseCase");

describe("CartController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};  // Inicializando o objeto de requisição vazio
    res = {
      status: jest.fn().mockReturnThis(),  // Mock do método `status`
      json: jest.fn().mockReturnThis(),  // Mock do método `json`
    };
    next = jest.fn();  // Mock do middleware `next`
  });

  it("should add product to cart successfully", async () => {
    const mockResult = { id: 1, productId: 2, quantity: 3 };  // Mock do resultado esperado

    // Mock do método `execute` do `AddProductToCartUseCase`
    const addProductToCartUseCaseMock = AddProductToCartUseCase.prototype.execute as jest.Mock;
    addProductToCartUseCaseMock.mockResolvedValue(mockResult);  // Simula uma execução bem-sucedida do use case

    req.params = { cartId: "1" };  // Parâmetro de cartId na URL
    req.body = { productId: 2, quantity: 3 };  // Corpo da requisição com os dados do produto

    // Chama o método `addProduct` do controlador
    await CartController.addProduct(req as Request, res as Response);

    // Verifica se o método `execute` foi chamado com os parâmetros esperados
    expect(addProductToCartUseCaseMock).toHaveBeenCalledWith(1, 2, 3);
    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a resposta retornou o objeto mockado corretamente
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("should return error when adding product to cart fails", async () => {
    const errorMessage = "Error adding product";  // Mensagem de erro para simulação

    // Mock para simular erro no `execute` do `AddProductToCartUseCase`
    const addProductToCartUseCaseMock = AddProductToCartUseCase.prototype.execute as jest.Mock;
    addProductToCartUseCaseMock.mockRejectedValue(new Error(errorMessage));  // Simula falha no use case

    req.params = { cartId: "1" };  // Parâmetro de cartId na URL
    req.body = { productId: 2, quantity: 3 };  // Corpo da requisição com dados de produto

    // Chama o método `addProduct` do controlador
    await CartController.addProduct(req as Request, res as Response);

    // Verifica se o status 400 (Bad Request) foi retornado
    expect(res.status).toHaveBeenCalledWith(400);
    // Verifica se a resposta retornou a mensagem de erro correta
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should remove product from cart successfully", async () => {
    // Mock para simular sucesso no `execute` do `RemoveProductFromCartUseCase`
    const removeProductFromCartUseCaseMock = RemoveProductFromCartUseCase.prototype.execute as jest.Mock;
    removeProductFromCartUseCaseMock.mockResolvedValue(undefined);  // Não retorna nada, indicando sucesso

    req.params = { cartItemId: "1" };  // Parâmetro de cartItemId na URL

    // Chama o método `removeProduct` do controlador
    await CartController.removeProduct(req as Request, res as Response);

    // Verifica se o método `execute` foi chamado com o parâmetro esperado
    expect(removeProductFromCartUseCaseMock).toHaveBeenCalledWith(1);
    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith({ message: "Produto removido do carrinho." });
  });

  it("should update cart item quantity successfully", async () => {
    const mockResult = { id: 1, quantity: 5 };  // Mock do resultado esperado

    // Mock do método `execute` do `UpdateCartItemQuantityUseCase`
    const updateCartItemQuantityUseCaseMock = UpdateCartItemQuantityUseCase.prototype.execute as jest.Mock;
    updateCartItemQuantityUseCaseMock.mockResolvedValue(mockResult);  // Simula uma execução bem-sucedida

    req.params = { cartItemId: "1" };  // Parâmetro de cartItemId na URL
    req.body = { quantity: 5 };  // Corpo da requisição com a quantidade do item

    // Chama o método `updateQuantity` do controlador
    await CartController.updateQuantity(req as Request, res as Response);

    // Verifica se o método `execute` foi chamado com os parâmetros esperados
    expect(updateCartItemQuantityUseCaseMock).toHaveBeenCalledWith(1, 5);
    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a resposta retornou o objeto mockado corretamente
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("should clear cart successfully", async () => {
    const mockMessage = "Carrinho limpo com sucesso.";  // Mensagem mockada para o sucesso

    // Mock para simular sucesso no `execute` do `ClearCartUseCase`
    const clearCartUseCaseMock = ClearCartUseCase.prototype.execute as jest.Mock;
    clearCartUseCaseMock.mockResolvedValue(mockMessage);

    req.params = { cartId: "1" };  // Parâmetro de cartId na URL

    // Chama o método `clear` do controlador
    await CartController.clear(req as Request, res as Response);

    // Verifica se o método `execute` foi chamado com o parâmetro esperado
    expect(clearCartUseCaseMock).toHaveBeenCalledWith(1);
    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(res.json).toHaveBeenCalledWith({ message: mockMessage });
  });

  it("should get cart successfully", async () => {
    const mockCart = { id: 1, items: [] };  // Mock do cart com itens vazios

    // Mock para simular sucesso no `execute` do `GetCartUseCase`
    const getCartUseCaseMock = GetCartUseCase.prototype.execute as jest.Mock;
    getCartUseCaseMock.mockResolvedValue(mockCart);

    req.params = { cartId: "1" };  // Parâmetro de cartId na URL

    // Chama o método `getCart` do controlador
    await CartController.getCart(req as Request, res as Response);

    // Verifica se o método `execute` foi chamado com o parâmetro esperado
    expect(getCartUseCaseMock).toHaveBeenCalledWith(1);
    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se o cart foi retornado corretamente
    expect(res.json).toHaveBeenCalledWith(mockCart);
  });

  it("should finalize order successfully", async () => {
    const mockOrder = { id: 1, status: "completed" };  // Mock do pedido finalizado

    // Mock para simular sucesso no `execute` do `ConvertCartToOrderUseCase`
    const convertCartToOrderUseCaseMock = ConvertCartToOrderUseCase.prototype.execute as jest.Mock;
    convertCartToOrderUseCaseMock.mockResolvedValue(mockOrder);

    req.params = { cartId: "1" };  // Parâmetro de cartId na URL
    req.body = { paymentMethod: "credit card", addressId: 2 };  // Corpo da requisição com método de pagamento e endereço

    // Chama o método `finalize` do controlador
    await CartController.finalize(req as Request, res as Response);

    // Verifica se o método `execute` foi chamado com os parâmetros esperados
    expect(convertCartToOrderUseCaseMock).toHaveBeenCalledWith(1, "credit card", 2);
    // Verifica se o status 200 (OK) foi retornado
    expect(res.status).toHaveBeenCalledWith(200);
    // Verifica se o pedido foi retornado corretamente
    expect(res.json).toHaveBeenCalledWith(mockOrder);
  });
});
