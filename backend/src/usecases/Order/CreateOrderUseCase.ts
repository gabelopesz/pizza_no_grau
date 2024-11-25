import { OrderRepository } from "../../repositories/OrderRepository";
import { ProductRepository } from "../../repositories/ProductRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { Order, OrderStatus } from "../../entities/Order";

interface CreateOrderInput {
  userId: number;
  products: number[]; 
  paymentMethod: string; 
}

export class CreateOrderUseCase {
  async execute(data: CreateOrderInput): Promise<Order> {
    const { userId, products, paymentMethod } = data;


    const user = await UserRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }


    const productEntities = await ProductRepository.findByIds(products);
    if (productEntities.length !== products.length) {
      throw new Error("Um ou mais produtos não foram encontrados.");
    }

    // Calcular o preço total
    const totalPrice = productEntities.reduce((sum, product) => sum + Number(product.price), 0);

    // Criar o pedido
    const order = OrderRepository.create({
      user, // Objeto completo do usuário
      products: productEntities, // Array de produtos
      totalPrice,
      paymentMethod,
      status: OrderStatus.PENDENTE, // Usar o enum para evitar erros
    });

    // Salvar e retornar o pedido criado
    return await OrderRepository.save(order);
  }
}
