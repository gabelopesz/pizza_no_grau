import { OrderRepository } from "../../repositories/OrderRepository";

export class TrackOrderUseCase {
  async execute(userId: number, orderId: number): Promise<{ id: number; status: string }> {
    // Buscar o pedido pelo ID e validar se pertence ao usuário
    const order = await OrderRepository.findOne({
      where: { id: orderId, user: { id: userId } }, // Verificar relação com o usuário
      relations: ["user"], // Carregar dados do usuário para validação
    });

    if (!order) {
      throw new Error("Pedido não encontrado ou não pertence ao usuário.");
    }

    // Retornar o ID e o status do pedido
    return { id: order.id, status: order.status };
  }
}
