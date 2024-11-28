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
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should add product to cart successfully", async () => {
    const mockResult = { id: 1, productId: 2, quantity: 3 };
    
    // Mockando o método execute do AddProductToCartUseCase
    const addProductToCartUseCaseMock = AddProductToCartUseCase.prototype.execute as jest.Mock;
    addProductToCartUseCaseMock.mockResolvedValue(mockResult);

    req.params = { cartId: "1" };
    req.body = { productId: 2, quantity: 3 };

    await CartController.addProduct(req as Request, res as Response);

    expect(addProductToCartUseCaseMock).toHaveBeenCalledWith(1, 2, 3);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("should return error when adding product to cart fails", async () => {
    const errorMessage = "Error adding product";
    const addProductToCartUseCaseMock = AddProductToCartUseCase.prototype.execute as jest.Mock;
    addProductToCartUseCaseMock.mockRejectedValue(new Error(errorMessage));

    req.params = { cartId: "1" };
    req.body = { productId: 2, quantity: 3 };

    await CartController.addProduct(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should remove product from cart successfully", async () => {
    const removeProductFromCartUseCaseMock = RemoveProductFromCartUseCase.prototype.execute as jest.Mock;
    removeProductFromCartUseCaseMock.mockResolvedValue(undefined); // Corrigido: Passando `undefined`

    req.params = { cartItemId: "1" };

    await CartController.removeProduct(req as Request, res as Response);

    expect(removeProductFromCartUseCaseMock).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Produto removido do carrinho." });
  });

  it("should update cart item quantity successfully", async () => {
    const mockResult = { id: 1, quantity: 5 };
    const updateCartItemQuantityUseCaseMock = UpdateCartItemQuantityUseCase.prototype.execute as jest.Mock;
    updateCartItemQuantityUseCaseMock.mockResolvedValue(mockResult);

    req.params = { cartItemId: "1" };
    req.body = { quantity: 5 };

    await CartController.updateQuantity(req as Request, res as Response);

    expect(updateCartItemQuantityUseCaseMock).toHaveBeenCalledWith(1, 5);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("should clear cart successfully", async () => {
    const mockMessage = "Carrinho limpo com sucesso.";
    const clearCartUseCaseMock = ClearCartUseCase.prototype.execute as jest.Mock;
    clearCartUseCaseMock.mockResolvedValue(mockMessage);

    req.params = { cartId: "1" };

    await CartController.clear(req as Request, res as Response);

    expect(clearCartUseCaseMock).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: mockMessage });
  });

  it("should get cart successfully", async () => {
    const mockCart = { id: 1, items: [] };
    const getCartUseCaseMock = GetCartUseCase.prototype.execute as jest.Mock;
    getCartUseCaseMock.mockResolvedValue(mockCart);

    req.params = { cartId: "1" };

    await CartController.getCart(req as Request, res as Response);

    expect(getCartUseCaseMock).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCart);
  });

  it("should finalize order successfully", async () => {
    const mockOrder = { id: 1, status: "completed" };
    const convertCartToOrderUseCaseMock = ConvertCartToOrderUseCase.prototype.execute as jest.Mock;
    convertCartToOrderUseCaseMock.mockResolvedValue(mockOrder);

    req.params = { cartId: "1" };
    req.body = { paymentMethod: "credit card", addressId: 2 };

    await CartController.finalize(req as Request, res as Response);

    expect(convertCartToOrderUseCaseMock).toHaveBeenCalledWith(1, "credit card", 2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockOrder);
  });
});
