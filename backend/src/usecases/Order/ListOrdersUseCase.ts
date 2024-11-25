import { OrderRepository } from "../../repositories/OrderRepository";

export class ListOrdersUseCase {
  async execute(userId?: number): Promise<any[]> {
    if (userId) {
      return await OrderRepository.find({
        where: { user: { id: userId } },
        relations: ["user", "products"],
        order: { createdAt: "DESC" },
      });
    }
    return await OrderRepository.find({
      relations: ["user", "products"],
      order: { createdAt: "DESC" },
    });
  }
}
