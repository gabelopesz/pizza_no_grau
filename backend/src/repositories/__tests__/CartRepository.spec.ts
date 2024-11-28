import { CartRepository, CartItemRepository } from "../CartRepository";
import { Cart } from "../../entities/Cart";
import { CartItem } from "../../entities/CartItem";
import { AppDataSource } from "../../config/database";

// Mockando o AppDataSource e os repositórios
jest.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('CartRepository', () => {
  let cartRepository: any;

  beforeEach(() => {
    // Criando mocks para os métodos dos repositórios
    cartRepository = {
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock do AppDataSource.getRepository para retornar o repositório mockado de Cart
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity: any) => {
      if (entity === Cart) return cartRepository; // Retorna o mock de CartRepository
    });
  });

  it('should find all carts successfully', async () => {
    const mockCarts = [new Cart(), new Cart()]; // Usando instâncias completas de Cart
    cartRepository.find.mockResolvedValue(mockCarts);

    // Chamando o repositório mockado corretamente
    const result = await cartRepository.find();

    expect(cartRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockCarts);
  });

  it('should save a cart successfully', async () => {
    const mockCart = new Cart(); // Usando instância completa de Cart
    cartRepository.save.mockResolvedValue(mockCart);

    const result = await cartRepository.save(mockCart);

    expect(cartRepository.save).toHaveBeenCalledWith(mockCart);
    expect(result).toEqual(mockCart);
  });

  it('should remove a cart successfully', async () => {
    const mockCart = new Cart(); // Usando instância completa de Cart
    cartRepository.remove.mockResolvedValue(mockCart);

    const result = await cartRepository.remove(mockCart);

    expect(cartRepository.remove).toHaveBeenCalledWith(mockCart);
    expect(result).toEqual(mockCart);
  });
});

describe('CartItemRepository', () => {
  let cartItemRepository: any;

  beforeEach(() => {
    // Criando mocks para os métodos dos repositórios de CartItem
    cartItemRepository = {
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock do AppDataSource.getRepository para retornar o repositório mockado de CartItem
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity: any) => {
      if (entity === CartItem) return cartItemRepository; // Retorna o mock de CartItemRepository
    });
  });

  it('should find all cart items successfully', async () => {
    const mockCartItems = [new CartItem(), new CartItem()]; // Usando instâncias completas de CartItem
    cartItemRepository.find.mockResolvedValue(mockCartItems);

    const result = await cartItemRepository.find();

    expect(cartItemRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockCartItems);
  });

  it('should save a cart item successfully', async () => {
    const mockCartItem = new CartItem(); // Usando instância completa de CartItem
    cartItemRepository.save.mockResolvedValue(mockCartItem);

    const result = await cartItemRepository.save(mockCartItem);

    expect(cartItemRepository.save).toHaveBeenCalledWith(mockCartItem);
    expect(result).toEqual(mockCartItem);
  });

  it('should remove a cart item successfully', async () => {
    const mockCartItem = new CartItem(); // Usando instância completa de CartItem
    cartItemRepository.remove.mockResolvedValue(mockCartItem);

    const result = await cartItemRepository.remove(mockCartItem);

    expect(cartItemRepository.remove).toHaveBeenCalledWith(mockCartItem);
    expect(result).toEqual(mockCartItem);
  });
});
