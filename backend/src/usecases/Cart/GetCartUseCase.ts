import { CartRepository } from "../../repositories/CartRepository";

export class GetCartUseCase {
    async execute(cartId: number) {
        const cart = await CartRepository.findOne({ where: { id: cartId }, relations: ["items", "items.product"] });
        if (!cart) throw new Error("Carrinho não encontrado.");

        return cart;
    }
}
