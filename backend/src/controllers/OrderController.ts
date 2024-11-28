import { Request, Response } from "express";
import { CreateOrderUseCase } from "../usecases/Order/CreateOrderUseCase";
import { CancelOrderUseCase } from "../usecases/Order/CancelOrderUseCase";
import { TrackOrderUseCase } from "../usecases/Order/TrackOrderUseCase";
import { ListOrdersUseCase } from "../usecases/Order/ListOrdersUseCase";
import { CompleteOrderUseCase } from "../usecases/Order/CompleteOrderUseCase";

export class OrderController {
  /**
   * Criar pedido
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, products, paymentMethod, addressId } = req.body;

      // Validação mínima de entrada
      if (!userId || !products || !paymentMethod || !addressId) {
        return res.status(400).json({ error: "Dados obrigatórios ausentes." });
      }

      const createOrder = new CreateOrderUseCase();
      const order = await createOrder.execute({
        userId: Number(userId),
        products,
        paymentMethod,
        addressId: Number(addressId),
      });

      return res.status(201).json(order);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  /**
   * Cancelar pedido
   */
  async cancel(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, orderId } = req.params;

      if (!userId || !orderId) {
        return res.status(400).json({ error: "Parâmetros obrigatórios ausentes." });
      }

      const cancelOrder = new CancelOrderUseCase();
      await cancelOrder.execute(Number(userId), Number(orderId));

      return res.status(200).json({ message: "Pedido cancelado com sucesso." });
    } catch (error) {
      console.error("Erro ao cancelar pedido:", error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  /**
   * Rastrear pedido
   */
  async track(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, orderId } = req.params;

      if (!userId || !orderId) {
        return res.status(400).json({ error: "Parâmetros obrigatórios ausentes." });
      }

      const trackOrder = new TrackOrderUseCase();
      const status = await trackOrder.execute(Number(userId), Number(orderId));

      return res.status(200).json(status);
    } catch (error) {
      console.error("Erro ao rastrear pedido:", error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  /**
   * Listar pedidos
   */
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.query;

      const listOrders = new ListOrdersUseCase();
      const orders = await listOrders.execute(userId ? Number(userId) : undefined);

      return res.status(200).json(orders);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  /**
   * Finalizar pedido
   */
  async complete(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, orderId } = req.params;

      if (!userId || !orderId) {
        return res.status(400).json({ error: "Parâmetros obrigatórios ausentes." });
      }

      const completeOrder = new CompleteOrderUseCase();
      await completeOrder.execute(Number(userId), Number(orderId));

      return res.status(200).json({ message: "Pedido concluído com sucesso." });
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
