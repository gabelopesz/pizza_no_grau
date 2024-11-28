import { OrderRepository } from "../../repositories/OrderRepository";
import { OrderStatus } from "../../entities/Order";

export class CompleteOrderUseCase {
  async execute(userId: number, orderId: number): Promise<void> {
    // Buscar o pedido pelo ID e validar se pertence ao usuário
    const order = await OrderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ["user"], // Carregar informações do usuário
    });

    if (!order) {
      throw new Error("Pedido não encontrado ou não pertence ao usuário.");
    }

    // Verificar se o pedido já foi concluído
    if (order.status === OrderStatus.CONCLUIDO) {
      throw new Error("Este pedido já foi concluído.");
    }

    // Atualizar o status para concluído e registrar a data de conclusão
    order.status = OrderStatus.CONCLUIDO;
    order.completedAt = new Date();

    // Salvar as alterações no banco de dados
    await OrderRepository.save(order);
  }
}
