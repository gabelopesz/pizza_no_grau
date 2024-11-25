import { OrderRepository } from "../../repositories/OrderRepository";

export class TrackOrderUseCase {
  async execute(orderId: number): Promise<{ id: number; status: string }> {
    const order = await OrderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new Error("Pedido não encontrado.");
    }
    return { id: order.id, status: order.status };
  }
}
