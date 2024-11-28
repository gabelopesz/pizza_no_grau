import { CartRepository, CartItemRepository } from "../../repositories/CartRepository";

export class RemoveProductFromCartUseCase {
    async execute(userId: number, productId: number) {
        // Buscar o carrinho ativo do usuário
        const cart = await CartRepository.findOne({
            where: { user: { id: userId }, isOrder: false },
            relations: ["items", "items.product"], // Relacionar os itens do carrinho e produtos
        });

        if (!cart) {
            throw new Error("Carrinho não encontrado para este usuário.");
        }

        // Encontrar o item no carrinho com o produto especificado
        const cartItem = cart.items.find((item) => item.product.id === productId);
        if (!cartItem) {
            throw new Error("Produto não encontrado no carrinho.");
        }

        // Remover o item do carrinho
        await CartItemRepository.remove(cartItem);

        return { message: "Produto removido do carrinho com sucesso." };
    }
}
