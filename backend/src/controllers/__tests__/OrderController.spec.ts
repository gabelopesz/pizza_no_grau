import { OrderController } from "../OrderController";
import { CreateOrderUseCase } from "../../usecases/Order/CreateOrderUseCase";
import { CancelOrderUseCase } from "../../usecases/Order/CancelOrderUseCase";
import { TrackOrderUseCase } from "../../usecases/Order/TrackOrderUseCase";
import { ListOrdersUseCase } from "../../usecases/Order/ListOrdersUseCase";
import { Request, Response } from "express";

// Mocks automáticos para os casos de uso
jest.mock("../../usecases/Order/CreateOrderUseCase");
jest.mock("../../usecases/Order/CancelOrderUseCase");
jest.mock("../../usecases/Order/TrackOrderUseCase");
jest.mock("../../usecases/Order/ListOrdersUseCase");

describe("OrderController", () => {
  let controller: OrderController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    controller = new OrderController();  // Inicializa o controlador de pedidos antes de cada teste
    mockReq = {};  // Inicializa o objeto `req` (requisição) vazio
    mockRes = {
      status: jest.fn().mockReturnThis(),  // Mock do método `status`
      json: jest.fn(),                    // Mock do método `json`
    };
    statusMock = mockRes.status as jest.Mock;  // Mock do `status` do `res`
    jsonMock = mockRes.json as jest.Mock;      // Mock do `json` do `res`
  });

  it("should create an order successfully", async () => {
    const orderData = { userId: 1, products: [1, 2], paymentMethod: "credit" };  // Dados para criação de pedido
    const mockOrder = { id: 123, ...orderData };  // Pedido mockado, com um ID adicionado

    // Mock do `CreateOrderUseCase` para simular sucesso na criação do pedido
    (CreateOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockOrder),
    }));

    mockReq.body = orderData;  // Define o corpo da requisição com os dados do pedido

    // Chama o método `create` do controlador de pedidos
    await controller.create(mockReq as Request, mockRes as Response);

    // Verifica se o status 201 (Created) foi retornado
    expect(statusMock).toHaveBeenCalledWith(201);
    // Verifica se o pedido mockado foi retornado como resposta
    expect(jsonMock).toHaveBeenCalledWith(mockOrder);
  });

  it("should return error when create order fails", async () => {
    const error = new Error("Order creation failed");  // Erro simulado

    // Mock do `CreateOrderUseCase` para simular falha na criação do pedido
    (CreateOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    mockReq.body = { userId: 1, products: [1, 2], paymentMethod: "credit" };  // Dados do pedido

    // Chama o método `create` do controlador de pedidos
    await controller.create(mockReq as Request, mockRes as Response);

    // Verifica se o status 400 (Bad Request) foi retornado
    expect(statusMock).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
  });

  it("should cancel an order successfully", async () => {
    const mockId = 123;  // ID do pedido a ser cancelado

    // Mock do `CancelOrderUseCase` para simular sucesso no cancelamento
    (CancelOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(undefined),  // Retorna `undefined` como sucesso
    }));

    mockReq.params = { id: `${mockId}` };  // Define o parâmetro `id` na URL da requisição

    // Chama o método `cancel` do controlador de pedidos
    await controller.cancel(mockReq as Request, mockRes as Response);

    // Verifica se o status 200 (OK) foi retornado
    expect(statusMock).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(jsonMock).toHaveBeenCalledWith({ message: "Pedido cancelado com sucesso." });
  });

  it("should return error when cancel order fails", async () => {
    const error = new Error("Cancel failed");  // Erro simulado no cancelamento do pedido

    // Mock do `CancelOrderUseCase` para simular falha no cancelamento do pedido
    (CancelOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    mockReq.params = { id: "123" };  // Define o ID do pedido a ser cancelado

    // Chama o método `cancel` do controlador de pedidos
    await controller.cancel(mockReq as Request, mockRes as Response);

    // Verifica se o status 400 (Bad Request) foi retornado
    expect(statusMock).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
  });

  it("should track an order successfully", async () => {
    const mockId = 123;  // ID do pedido
    const mockStatus = "delivered";  // Status do pedido

    // Mock do `TrackOrderUseCase` para simular sucesso no rastreamento
    (TrackOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockStatus),  // Retorna o status mockado
    }));

    mockReq.params = { id: `${mockId}` };  // Define o parâmetro `id` na URL da requisição

    // Chama o método `track` do controlador de pedidos
    await controller.track(mockReq as Request, mockRes as Response);

    // Verifica se o status 200 (OK) foi retornado
    expect(statusMock).toHaveBeenCalledWith(200);
    // Verifica se o status do pedido foi retornado corretamente
    expect(jsonMock).toHaveBeenCalledWith({ status: mockStatus });
  });

  it("should return error when track order fails", async () => {
    const error = new Error("Track failed");  // Erro simulado no rastreamento do pedido

    // Mock do `TrackOrderUseCase` para simular falha no rastreamento
    (TrackOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    mockReq.params = { id: "123" };  // Define o ID do pedido a ser rastreado

    // Chama o método `track` do controlador de pedidos
    await controller.track(mockReq as Request, mockRes as Response);

    // Verifica se o status 400 (Bad Request) foi retornado
    expect(statusMock).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
  });

  it("should list orders successfully", async () => {
    const mockOrders = [{ id: 1, userId: 1, status: "completed" }];  // Mock da lista de pedidos

    // Mock do `ListOrdersUseCase` para simular sucesso na listagem de pedidos
    (ListOrdersUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockOrders),  // Retorna os pedidos mockados
    }));

    mockReq.query = { userId: "1" };  // Define o parâmetro `userId` na URL da requisição

    // Chama o método `list` do controlador de pedidos
    await controller.list(mockReq as Request, mockRes as Response);

    // Verifica se o status 200 (OK) foi retornado
    expect(statusMock).toHaveBeenCalledWith(200);
    // Verifica se os pedidos foram retornados corretamente
    expect(jsonMock).toHaveBeenCalledWith(mockOrders);
  });

  it("should return error when list orders fails", async () => {
    const error = new Error("Failed to list orders");  // Erro simulado ao listar os pedidos

    // Mock do `ListOrdersUseCase` para simular falha na listagem
    (ListOrdersUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    mockReq.query = { userId: "1" };  // Define o parâmetro `userId` para a consulta de pedidos

    // Chama o método `list` do controlador de pedidos
    await controller.list(mockReq as Request, mockRes as Response);

    // Verifica se o status 400 (Bad Request) foi retornado
    expect(statusMock).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
  });
});
