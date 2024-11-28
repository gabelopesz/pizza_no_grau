import { CartItemRepository } from "../../repositories/CartRepository";

export class UpdateCartItemQuantityUseCase {
    async execute(cartItemId: number, quantity: number) {
        const cartItem = await CartItemRepository.findOne({ where: { id: cartItemId } });
        if (!cartItem) throw new Error("Item não encontrado no carrinho.");

        if (quantity <= 0) throw new Error("Quantidade inválida.");

        cartItem.quantity = quantity;
        return CartItemRepository.save(cartItem);
    }
}
