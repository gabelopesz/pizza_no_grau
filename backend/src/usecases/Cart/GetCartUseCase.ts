import { CartRepository } from "../../repositories/CartRepository";

export class GetCartUseCase {
    async executeByUser(userId: number) {
        const cart = await CartRepository.findOne({
            where: { user: { id: userId }, isOrder: false },
            relations: ["items", "items.product"], // Carregar apenas relações diretas necessárias
        });

        if (!cart) {
            throw new Error("Carrinho não encontrado.");
        }

        // Formatando a resposta para evitar redundância e recursividade
        const formattedCart = {
            id: cart.id,
            isOrder: cart.isOrder,
            items: cart.items.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                product: {
                    id: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    description: item.product.description,
                    isActive: item.product.isActive,
                    imageUrl: item.product.imageUrl,
                },
            })),
        };

        return formattedCart;
    }
}

