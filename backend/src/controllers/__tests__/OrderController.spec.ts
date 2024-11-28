// Importa o controlador de pedidos e os casos de uso
import { OrderController } from "../OrderController";
import { CreateOrderUseCase } from "../../usecases/Order/CreateOrderUseCase";
import { CancelOrderUseCase } from "../../usecases/Order/CancelOrderUseCase";
import { TrackOrderUseCase } from "../../usecases/Order/TrackOrderUseCase";
import { ListOrdersUseCase } from "../../usecases/Order/ListOrdersUseCase";
import { CompleteOrderUseCase } from "../../usecases/Order/CompleteOrderUseCase";
import { Request, Response } from "express";

// Mocka os casos de uso para evitar chamadas reais a banco de dados ou serviços externos
jest.mock("../../usecases/Order/CreateOrderUseCase");
jest.mock("../../usecases/Order/CancelOrderUseCase");
jest.mock("../../usecases/Order/TrackOrderUseCase");
jest.mock("../../usecases/Order/ListOrdersUseCase");
jest.mock("../../usecases/Order/CompleteOrderUseCase");

describe("OrderController", () => {
  // Declarações das variáveis utilizadas em cada teste
  let controller: OrderController; // Instância do controlador
  let mockReq: Partial<Request>; // Mock da requisição
  let mockRes: Partial<Response>; // Mock da resposta

  // Executado antes de cada teste para garantir isolamento entre os casos
  beforeEach(() => {
    controller = new OrderController(); // Instancia o controlador
    mockReq = {}; // Inicializa o mock da requisição
    mockRes = {
      status: jest.fn().mockReturnThis(), // Mocka o método `status` da resposta
      json: jest.fn(), // Mocka o método `json` da resposta
    };
  });

  // Teste para criar um pedido com sucesso
  it("should create an order successfully", async () => {
    // Dados de entrada para a criação do pedido
    const orderData = {
      userId: 1,
      products: [1, 2],
      paymentMethod: "credit",
      addressId: 1,
    };

    // Dados esperados de retorno após a criação do pedido
    const mockOrder = {
      id: 123,
      userId: 1,
      products: [{ id: 1 }, { id: 2 }],
      paymentMethod: "credit",
      totalPrice: 100,
      status: "PENDING",
    };

    // Mocka a execução do caso de uso para retornar os dados simulados
    (CreateOrderUseCase.prototype.execute as jest.Mock).mockResolvedValue(mockOrder);

    mockReq.body = orderData; // Simula os dados da requisição

    // Chama o método de criação de pedido no controlador
    await controller.create(mockReq as Request, mockRes as Response);

    // Verifica se o código HTTP 201 foi retornado
    expect(mockRes.status).toHaveBeenCalledWith(201);
    // Verifica se o pedido criado foi retornado corretamente
    expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
  });

  // Teste para verificar erro ao criar pedido com dados ausentes
  it("should return error when creating an order with missing data", async () => {
    mockReq.body = { userId: 1 }; // Dados incompletos para a criação do pedido

    // Chama o método de criação com dados ausentes
    await controller.create(mockReq as Request, mockRes as Response);

    // Verifica se o código HTTP 400 foi retornado
    expect(mockRes.status).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Dados obrigatórios ausentes." });
  });

  // Teste para cancelar um pedido com sucesso
  it("should cancel an order successfully", async () => {
    const mockId = 123; // ID do pedido a ser cancelado

    // Mocka o caso de uso para retornar sucesso
    (CancelOrderUseCase.prototype.execute as jest.Mock).mockResolvedValue(undefined);

    mockReq.params = { userId: "1", orderId: `${mockId}` }; // Simula os parâmetros da requisição

    // Chama o método de cancelamento no controlador
    await controller.cancel(mockReq as Request, mockRes as Response);

    // Verifica se o código HTTP 200 foi retornado
    expect(mockRes.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Pedido cancelado com sucesso." });
  });

  // Teste para rastrear um pedido com sucesso
  it("should track an order successfully", async () => {
    const mockStatus = { id: 123, status: "DELIVERED" }; // Status esperado do pedido

    // Mocka o caso de uso para retornar o status do pedido
    (TrackOrderUseCase.prototype.execute as jest.Mock).mockResolvedValue(mockStatus);

    mockReq.params = { userId: "1", orderId: "123" }; // Simula os parâmetros da requisição

    // Chama o método de rastreamento no controlador
    await controller.track(mockReq as Request, mockRes as Response);

    // Verifica se o código HTTP 200 foi retornado
    expect(mockRes.status).toHaveBeenCalledWith(200);
    // Verifica se o status do pedido foi retornado corretamente
    expect(mockRes.json).toHaveBeenCalledWith(mockStatus);
  });

  // Teste para listar pedidos com sucesso
  it("should list orders successfully", async () => {
    const mockOrders = [
      { id: 1, userId: 1, status: "PENDING", totalPrice: 100 },
    ]; // Pedidos esperados

    // Mocka o caso de uso para retornar os pedidos simulados
    (ListOrdersUseCase.prototype.execute as jest.Mock).mockResolvedValue(mockOrders);

    mockReq.query = { userId: "1" }; // Simula os parâmetros de consulta

    // Chama o método de listagem no controlador
    await controller.list(mockReq as Request, mockRes as Response);

    // Verifica se o código HTTP 200 foi retornado
    expect(mockRes.status).toHaveBeenCalledWith(200);
    // Verifica se os pedidos foram retornados corretamente
    expect(mockRes.json).toHaveBeenCalledWith(mockOrders);
  });

  // Teste para finalizar um pedido com sucesso
  it("should complete an order successfully", async () => {
    const mockId = 123; // ID do pedido a ser finalizado

    // Mocka o caso de uso para retornar sucesso
    (CompleteOrderUseCase.prototype.execute as jest.Mock).mockResolvedValue(undefined);

    mockReq.params = { userId: "1", orderId: `${mockId}` }; // Simula os parâmetros da requisição

    // Chama o método de finalização no controlador
    await controller.complete(mockReq as Request, mockRes as Response);

    // Verifica se o código HTTP 200 foi retornado
    expect(mockRes.status).toHaveBeenCalledWith(200);
    // Verifica se a mensagem de sucesso foi retornada
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Pedido concluído com sucesso." });
  });

  // Teste para tratar erros durante a execução
  it("should handle errors during execution", async () => {
    const errorMessage = "An error occurred"; // Mensagem de erro simulada

    // Mocka o caso de uso para lançar um erro
    (CreateOrderUseCase.prototype.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    mockReq.body = {
      userId: 1,
      products: [1, 2],
      paymentMethod: "credit",
      addressId: 1,
    }; // Dados válidos para a requisição

    // Chama o método de criação e simula o erro
    await controller.create(mockReq as Request, mockRes as Response);

    // Verifica se o código HTTP 400 foi retornado
    expect(mockRes.status).toHaveBeenCalledWith(400);
    // Verifica se a mensagem de erro foi retornada
    expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});