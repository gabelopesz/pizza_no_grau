import { CartRepository, CartItemRepository } from "../../repositories/CartRepository";

export class ClearCartUseCase {
    async execute(cartId: number) {
        const cart = await CartRepository.findOne({ where: { id: cartId, isOrder: false }, relations: ["items"] });
        if (!cart) throw new Error("Carrinho não encontrado ou já convertido em pedido.");

        await CartItemRepository.remove(cart.items);
        return "Carrinho limpo com sucesso.";
    }
}
