import { CartRepository, CartItemRepository } from "../../repositories/CartRepository";

export class ClearCartUseCase {
    async execute(userId: number) {
        // Buscar o carrinho ativo do usuário
        const cart = await CartRepository.findOne({
            where: { user: { id: userId }, isOrder: false },
            relations: ["items"],
        });

        if (!cart) {
            throw new Error("Carrinho não encontrado ou já convertido em pedido.");
        }

        // Remover todos os itens do carrinho
        await CartItemRepository.remove(cart.items);

        return { message: "Carrinho limpo com sucesso." };
    }
}
