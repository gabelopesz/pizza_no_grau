import { OrderRepository } from "../../repositories/OrderRepository";
import { ProductRepository } from "../../repositories/ProductRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { AddressRepository } from "../../repositories/AddressRepository";
import { Order, OrderStatus } from "../../entities/Order";

interface CreateOrderInput {
  userId: number;
  products: number[];
  paymentMethod: string;
  addressId: number; 
}

export class CreateOrderUseCase {
  async execute(data: CreateOrderInput): Promise<Order> {
    const { userId, products, paymentMethod, addressId } = data;

    // Verificar se o usuário existe
    const user = await UserRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Verificar se o endereço existe e pertence ao usuário
    const address = await AddressRepository.findOne({
      where: { id: addressId, user: { id: userId } },
    });
    if (!address) {
      throw new Error("Endereço inválido ou não encontrado.");
    }

    // Verificar se os produtos existem
    const productEntities = await ProductRepository.findByIds(products);
    if (productEntities.length !== products.length) {
      throw new Error("Um ou mais produtos não foram encontrados.");
    }

    // Calcular o preço total
    const totalPrice = productEntities.reduce((sum, product) => sum + Number(product.price), 0);

    // Criar o pedido
    const order = OrderRepository.create({
      user, // Objeto completo do usuário
      address, // Endereço do pedido
      products: productEntities, // Produtos do pedido
      totalPrice,
      paymentMethod,
      status: OrderStatus.PENDENTE, // Status inicial do pedido
    });

    // Salvar e retornar o pedido criado
    return await OrderRepository.save(order);
  }
}
