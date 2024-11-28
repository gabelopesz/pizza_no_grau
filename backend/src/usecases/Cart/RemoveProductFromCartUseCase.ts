import { CartItemRepository } from "../../repositories/CartRepository";

export class RemoveProductFromCartUseCase {
    async execute(cartItemId: number) {
        const cartItem = await CartItemRepository.findOne({ where: { id: cartItemId } });
        if (!cartItem) throw new Error("Item não encontrado no carrinho.");

        return CartItemRepository.remove(cartItem);
    }
}
