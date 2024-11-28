import { CartRepository, CartItemRepository } from "../../repositories/CartRepository";
import { ProductRepository } from "../../repositories/ProductRepository";
import { UserRepository } from "../../repositories/UserRepository";

export class AddProductToCartUseCase {
    async execute(userId: number, productId: number, quantity: number) {
        // Validar a quantidade
        if (quantity <= 0) {
            throw new Error("A quantidade deve ser maior que zero.");
        }

        // Verificar se o usuário existe
        const user = await UserRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        // Buscar ou criar o carrinho ativo do usuário
        let cart = await CartRepository.findOne({
            where: { user, isOrder: false },
            relations: ["items", "items.product"],
        });

        if (!cart) {
            cart = CartRepository.create({ user, isOrder: false, items: [] });
            await CartRepository.save(cart);
        }

        // Verificar se o produto existe
        const product = await ProductRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new Error("Produto não encontrado.");
        }

        // Verificar se o produto já está no carrinho
        let cartItem = cart.items.find((item) => item.product.id === productId);

        if (cartItem) {
            // Atualizar a quantidade
            cartItem.quantity += quantity;
        } else {
            // Criar um novo item no carrinho
            cartItem = CartItemRepository.create({ cart, product, quantity });
            cart.items.push(cartItem); // Adicionar à lista de itens do carrinho
        }

        // Salvar o item atualizado ou criado
        await CartItemRepository.save(cartItem);

        return cart; 
}
}