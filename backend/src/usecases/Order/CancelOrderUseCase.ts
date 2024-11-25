import { OrderRepository } from "../../repositories/OrderRepository";
import { OrderStatus } from "../../entities/Order";

export class CancelOrderUseCase {
  async execute(orderId: number): Promise<void> {
    const order = await OrderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new Error("Pedido não encontrado.");
    }

    if (order.status === OrderStatus.CANCELADO) {
      throw new Error("Este pedido já foi cancelado.");
    }

    if (order.status === OrderStatus.CONCLUIDO) {
      throw new Error("Não é possível cancelar um pedido concluído.");
    }

    order.status = OrderStatus.CANCELADO;
    await OrderRepository.save(order);
  }
}
