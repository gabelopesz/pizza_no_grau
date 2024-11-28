import { CartRepository } from "../../repositories/CartRepository";
import { OrderRepository } from "../../repositories/OrderRepository";
import { AddressRepository } from "../../repositories/AddressRepository";
import { OrderStatus } from "../../entities/Order";

export class ConvertCartToOrderUseCase {
    async executeByUser(userId: number, paymentMethod: string, addressId: number) {
        // Buscar o carrinho ativo do usuário
        const cart = await CartRepository.findOne({
            where: { user: { id: userId }, isOrder: false },
            relations: ["items", "user", "items.product"],
        });

        if (!cart) {
            throw new Error("Carrinho não encontrado ou já convertido em pedido.");
        }

        // Validar o endereço
        const address = await AddressRepository.findOne({
            where: { id: addressId, user: { id: userId } },
        });

        if (!address) {
            throw new Error("Endereço inválido ou não encontrado.");
        }

        // Calcular o preço total
        const totalPrice = cart.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );

        // Criar o pedido
        const order = OrderRepository.create({
            user: cart.user,
            products: cart.items.map((item) => item.product),
            totalPrice,
            status: OrderStatus.PENDENTE,
            paymentMethod,
            address, // Associar o endereço ao pedido
        });

        const savedOrder = await OrderRepository.save(order);

        // Atualizar o carrinho
        cart.isOrder = true;
        cart.order = savedOrder;

        await CartRepository.save(cart);

        return savedOrder;
    }
}
