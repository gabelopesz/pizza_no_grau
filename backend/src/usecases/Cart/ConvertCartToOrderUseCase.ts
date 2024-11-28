import { CartRepository } from "../../repositories/CartRepository";
import { OrderRepository } from "../../repositories/OrderRepository";
import { OrderStatus } from "../../entities/Order";

export class ConvertCartToOrderUseCase {
    async execute(cartId: number, paymentMethod: string) {
        const cart = await CartRepository.findOne({ where: { id: cartId, isOrder: false }, relations: ["items", "user", "items.product"] });

        if (!cart) {
            throw new Error("Carrinho não encontrado ou já convertido em pedido.");
        }

        // Calcular o preço total
        const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        // Criar o pedido
        const order = OrderRepository.create({
            user: cart.user,
            products: cart.items.map(item => item.product),
            totalPrice,
            status: OrderStatus.PENDENTE,
            paymentMethod,
        });

        const savedOrder = await OrderRepository.save(order);

        // Atualizar o carrinho
        cart.isOrder = true;
        cart.order = savedOrder;

        await CartRepository.save(cart);

        return savedOrder;
    }
}
