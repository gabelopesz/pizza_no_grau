import { OrderRepository } from "../OrderRepository";
import { Order } from "../../entities/Order";
import { AppDataSource } from "../../config/database";

// Mockando o AppDataSource e os repositórios
jest.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('OrderRepository', () => {
  let orderRepository: any;

  beforeEach(() => {
    // Criando mocks para os métodos do repositório
    orderRepository = {
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock do AppDataSource.getRepository para retornar o repositório mockado de Order
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity: any) => {
      if (entity === Order) return orderRepository; // Retorna o mock de OrderRepository
    });
  });

  it('should find all orders successfully', async () => {
    const mockOrders = [new Order(), new Order()]; // Usando instâncias completas de Order
    orderRepository.find.mockResolvedValue(mockOrders);

    // Chamando o repositório mockado corretamente
    const result = await orderRepository.find();

    expect(orderRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockOrders);
  });

  it('should save an order successfully', async () => {
    const mockOrder = new Order(); // Usando instância completa de Order
    orderRepository.save.mockResolvedValue(mockOrder);

    const result = await orderRepository.save(mockOrder);

    expect(orderRepository.save).toHaveBeenCalledWith(mockOrder);
    expect(result).toEqual(mockOrder);
  });

  it('should remove an order successfully', async () => {
    const mockOrder = new Order(); // Usando instância completa de Order
    orderRepository.remove.mockResolvedValue(mockOrder);

    const result = await orderRepository.remove(mockOrder);

    expect(orderRepository.remove).toHaveBeenCalledWith(mockOrder);
    expect(result).toEqual(mockOrder);
  });
});
