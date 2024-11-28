import { OrderRepository } from "../../repositories/OrderRepository";

export class ListOrdersUseCase {
  async execute(userId?: number): Promise<any[]> {
    // Buscar pedidos com base no userId, se fornecido
    const orders = await OrderRepository.find({
      where: userId ? { user: { id: userId } } : undefined,
      relations: ["user", "products", "address"], // Incluindo o endereço
      order: { createdAt: "DESC" },
    });

    // Formatar a resposta para evitar dados desnecessários
    return orders.map((order) => ({
      id: order.id,
      user: {
        id: order.user.id,
        name: order.user.name,
      },
      address: {
        id: order.address.id,
        street: order.address.street,
        city: order.address.city,
      },
      products: order.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: order.createdAt,
      completedAt: order.completedAt,
    }));
  }
}
