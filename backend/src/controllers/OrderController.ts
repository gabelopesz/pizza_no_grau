import { Request, Response } from "express";
import { CreateOrderUseCase } from "../usecases/Order/CreateOrderUseCase";
import { CancelOrderUseCase } from "../usecases/Order/CancelOrderUseCase";
import { TrackOrderUseCase } from "../usecases/Order/TrackOrderUseCase";
import { ListOrdersUseCase } from "../usecases/Order/ListOrdersUseCase";

export class OrderController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, products, paymentMethod } = req.body;
      const createOrder = new CreateOrderUseCase();
      const order = await createOrder.execute({ userId, products, paymentMethod });
      return res.status(201).json(order);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async cancel(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const cancelOrder = new CancelOrderUseCase();
      await cancelOrder.execute(Number(id));
      return res.status(200).json({ message: "Pedido cancelado com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async track(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const trackOrder = new TrackOrderUseCase();
      const status = await trackOrder.execute(Number(id));
      return res.status(200).json({ status });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.query; // Filtro opcional por usuário
      const listOrders = new ListOrdersUseCase();
      const orders = await listOrders.execute(userId ? Number(userId) : undefined);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
