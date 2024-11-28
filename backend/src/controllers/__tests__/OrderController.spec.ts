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
    controller = new OrderController();
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    statusMock = mockRes.status as jest.Mock;
    jsonMock = mockRes.json as jest.Mock;
  });

  it("should create an order successfully", async () => {
    const orderData = { userId: 1, products: [1, 2], paymentMethod: "credit" };
    const mockOrder = { id: 123, ...orderData };

    (CreateOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockOrder),
    }));

    mockReq.body = orderData;

    await controller.create(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(mockOrder);
  });

  it("should return error when create order fails", async () => {
    const error = new Error("Order creation failed");
    (CreateOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    mockReq.body = { userId: 1, products: [1, 2], paymentMethod: "credit" };

    await controller.create(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
  });

  it("should cancel an order successfully", async () => {
    const mockId = 123;
    (CancelOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(undefined),
    }));

    mockReq.params = { id: `${mockId}` };

    await controller.cancel(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Pedido cancelado com sucesso." });
  });

  it("should return error when cancel order fails", async () => {
    const error = new Error("Cancel failed");
    (CancelOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    mockReq.params = { id: "123" };

    await controller.cancel(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
  });

  it("should track an order successfully", async () => {
    const mockId = 123;
    const mockStatus = "delivered";
    (TrackOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockStatus),
    }));

    mockReq.params = { id: `${mockId}` };

    await controller.track(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ status: mockStatus });
  });

  it("should return error when track order fails", async () => {
    const error = new Error("Track failed");
    (TrackOrderUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    mockReq.params = { id: "123" };

    await controller.track(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
  });

  it("should list orders successfully", async () => {
    const mockOrders = [{ id: 1, userId: 1, status: "completed" }];
    (ListOrdersUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(mockOrders),
    }));

    mockReq.query = { userId: "1" };

    await controller.list(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockOrders);
  });

  it("should return error when list orders fails", async () => {
    const error = new Error("Failed to list orders");
    (ListOrdersUseCase as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(error),
    }));

    mockReq.query = { userId: "1" };

    await controller.list(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
  });
});
