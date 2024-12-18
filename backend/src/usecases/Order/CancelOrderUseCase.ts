import { OrderRepository } from "../../repositories/OrderRepository";
import { OrderStatus } from "../../entities/Order";

export class CancelOrderUseCase {
  async execute(userId: number, orderId: number): Promise<void> {
    // Buscar o pedido pelo ID e validar o usuário
    const order = await OrderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ["user"], // Carregar informações do usuário
    });

    if (!order) {
      throw new Error("Pedido não encontrado ou não pertence ao usuário.");
    }

    // Verificar o status do pedido
    if (order.status === OrderStatus.CANCELADO) {
      throw new Error("Este pedido já foi cancelado.");
    }

    if (order.status === OrderStatus.CONCLUIDO) {
      throw new Error("Não é possível cancelar um pedido concluído.");
    }

    // Atualizar o status para cancelado
    order.status = OrderStatus.CANCELADO;
    await OrderRepository.save(order);
  }
}
