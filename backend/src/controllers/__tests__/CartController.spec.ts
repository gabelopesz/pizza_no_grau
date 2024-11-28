import { CartController } from "../CartController";
import { AddProductToCartUseCase } from "../../usecases/Cart/AddProductToCartUseCase";
import { RemoveProductFromCartUseCase } from "../../usecases/Cart/RemoveProductFromCartUseCase";
import { UpdateCartItemQuantityUseCase } from "../../usecases/Cart/UpdateCartItemQuantityUseCase";
import { ClearCartUseCase } from "../../usecases/Cart/ClearCartUseCase";
import { GetCartUseCase } from "../../usecases/Cart/GetCartUseCase";
import { ConvertCartToOrderUseCase } from "../../usecases/Cart/ConvertCartToOrderUseCase";
import { Request, Response } from "express";

// Mockando automaticamente os casos de uso para evitar chamadas reais ao banco de dados ou APIs externas
jest.mock("../../usecases/Cart/AddProductToCartUseCase");
jest.mock("../../usecases/Cart/RemoveProductFromCartUseCase");
jest.mock("../../usecases/Cart/UpdateCartItemQuantityUseCase");
jest.mock("../../usecases/Cart/ClearCartUseCase");
jest.mock("../../usecases/Cart/GetCartUseCase");
jest.mock("../../usecases/Cart/ConvertCartToOrderUseCase");

describe("CartController", () => {
  // Mock das requisições e respostas para simular o comportamento de uma API
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    // Inicializa os mocks antes de cada teste
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(), // Mock do método `status` para retornar o objeto `Response`
      json: jest.fn(), // Mock do método `json` para capturar os dados da resposta
    };
  });

  // Teste para adicionar um produto ao carrinho
  it("should add product to cart successfully", async () => {
    // Simula o retorno esperado do caso de uso
    const mockCart = { id: 1, userId: 1, items: [{ productId: 2, quantity: 3 }] };

    (AddProductToCartUseCase.prototype.execute as jest.Mock).mockResolvedValue(mockCart);

    // Simula os parâmetros e o corpo da requisição
    mockReq.params = { userId: "1" };
    mockReq.body = { productId: 2, quantity: 3 };

    // Chama o método do controlador
    await CartController.addProduct(mockReq as Request, mockRes as Response);

    // Verifica se o status e a resposta JSON foram chamados corretamente
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockCart);
  });

  // Teste para remover um produto do carrinho
  it("should remove product from cart successfully", async () => {
    // Simula o caso de uso para retornar sucesso
    (RemoveProductFromCartUseCase.prototype.execute as jest.Mock).mockResolvedValue(undefined);

    mockReq.params = { userId: "1" };
    mockReq.body = { productId: 2 };

    await CartController.removeProduct(mockReq as Request, mockRes as Response);

    // Verifica se a mensagem de sucesso foi retornada
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Produto removido do carrinho com sucesso.",
    });
  });

  // Teste para atualizar a quantidade de um produto no carrinho
  it("should update quantity in cart successfully", async () => {
    const mockUpdatedItem = { productId: 2, quantity: 5 };

    (UpdateCartItemQuantityUseCase.prototype.execute as jest.Mock).mockResolvedValue(
      mockUpdatedItem
    );

    mockReq.params = { userId: "1" };
    mockReq.body = { productId: 2, quantity: 5 };

    await CartController.updateQuantity(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedItem);
  });

  // Teste para limpar o carrinho
  it("should clear cart successfully", async () => {
    (ClearCartUseCase.prototype.execute as jest.Mock).mockResolvedValue(
      "Carrinho limpo com sucesso."
    );

    mockReq.params = { userId: "1" };

    await CartController.clear(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Carrinho limpo com sucesso." });
  });

  // Teste para buscar os itens do carrinho
  it("should retrieve cart successfully", async () => {
    const mockCart = { id: 1, userId: 1, items: [{ productId: 2, quantity: 3 }] };

    (GetCartUseCase.prototype.executeByUser as jest.Mock).mockResolvedValue(mockCart);

    mockReq.params = { userId: "1" };

    await CartController.getCart(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockCart);
  });

  // Teste para finalizar o carrinho e converter em pedido
  it("should finalize cart successfully", async () => {
    const mockOrder = {
      id: 1,
      userId: 1,
      items: [{ productId: 2, quantity: 3 }],
      total: 100,
      paymentMethod: "credit",
    };

    (ConvertCartToOrderUseCase.prototype.executeByUser as jest.Mock).mockResolvedValue(mockOrder);

    mockReq.params = { userId: "1" };
    mockReq.body = { paymentMethod: "credit", addressId: 1 };

    await CartController.finalize(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
  });

  // Teste para lidar com erros durante a execução de uma ação
  it("should handle errors during execution", async () => {
    const errorMessage = "An error occurred";

    // Simula um erro no caso de uso
    (AddProductToCartUseCase.prototype.execute as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    mockReq.params = { userId: "1" };
    mockReq.body = { productId: 2, quantity: 3 };

    await CartController.addProduct(mockReq as Request, mockRes as Response);

    // Verifica se o erro foi tratado corretamente
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});