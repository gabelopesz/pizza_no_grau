import { CartRepository, CartItemRepository } from "../../repositories/CartRepository";

export class UpdateCartItemQuantityUseCase {
    async execute(userId: number, productId: number, quantity: number) {
        // Validar a quantidade antes de buscar o item
        if (quantity <= 0) {
            throw new Error("Quantidade inválida. Deve ser maior que zero.");
        }

        // Buscar o carrinho ativo do usuário
        const cart = await CartRepository.findOne({
            where: { user: { id: userId }, isOrder: false },
            relations: ["items", "items.product"],
        });

        if (!cart) {
            throw new Error("Carrinho não encontrado para este usuário.");
        }

        // Encontrar o item no carrinho
        const cartItem = cart.items.find((item) => item.product.id === productId);
        if (!cartItem) {
            throw new Error("Produto não encontrado no carrinho.");
        }

        // Atualizar a quantidade
        cartItem.quantity = quantity;

        // Salvar o item atualizado
        return await CartItemRepository.save(cartItem);
    }
}
