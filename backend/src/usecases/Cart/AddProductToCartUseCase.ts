import { CartRepository, CartItemRepository } from "../../repositories/CartRepository";
import { ProductRepository } from "../../repositories/ProductRepository";
import { UserRepository } from "../../repositories/UserRepository";

export class AddProductToCartUseCase {
    async execute(userId: number, productId: number, quantity: number) {
        // Verificar se o usuário existe
        const user = await UserRepository.findOne({ where: { id: userId } });
        if (!user) throw new Error("Usuário não encontrado.");

        // Verificar se o carrinho já existe para o usuário
        let cart = await CartRepository.findOne({ where: { user, isOrder: false }, relations: ["items"] });

        // Criar o carrinho se ele não existir
        if (!cart) {
            cart = CartRepository.create({ user, isOrder: false, items: [] });
            await CartRepository.save(cart);
        }

        // Verificar se o produto existe
        const product = await ProductRepository.findOne({ where: { id: productId } });
        if (!product) throw new Error("Produto não encontrado.");

        // Verificar se o produto já está no carrinho
        let cartItem = await CartItemRepository.findOne({ where: { cart, product } });

        if (cartItem) {
            // Atualizar a quantidade
            cartItem.quantity += quantity;
        } else {
            // Criar um novo item no carrinho
            cartItem = CartItemRepository.create({ cart, product, quantity });
        }

        await CartItemRepository.save(cartItem);

        return cart; // Retornar o carrinho atualizado
    }
}
