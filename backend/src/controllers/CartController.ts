import { Request, Response } from "express";
import { AddProductToCartUseCase } from "../usecases/Cart/AddProductToCartUseCase";
import { RemoveProductFromCartUseCase } from "../usecases/Cart/RemoveProductFromCartUseCase";
import { UpdateCartItemQuantityUseCase } from "../usecases/Cart/UpdateCartItemQuantityUseCase";
import { ClearCartUseCase } from "../usecases/Cart/ClearCartUseCase";
import { GetCartUseCase } from "../usecases/Cart/GetCartUseCase";
import { ConvertCartToOrderUseCase } from "../usecases/Cart/ConvertCartToOrderUseCase";

export class CartController {
    static async addProduct(req: Request, res: Response) {
        const { userId } = req.params; // Alinhado ao fluxo centrado no usuário
        const { productId, quantity } = req.body;

        const useCase = new AddProductToCartUseCase();

        try {
            const cart = await useCase.execute(Number(userId), Number(productId), Number(quantity));
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }

    static async removeProduct(req: Request, res: Response) {
        const { userId } = req.params;
        const { productId } = req.body;
    
        const useCase = new RemoveProductFromCartUseCase();
    
        try {
            // Chamar o caso de uso para remover o produto
            await useCase.execute(Number(userId), Number(productId));
    
            // Retornar apenas uma mensagem clara
            res.status(200).json({ message: "Produto removido do carrinho com sucesso." });
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }    

    static async updateQuantity(req: Request, res: Response) {
        const { userId } = req.params; // Alinhado ao fluxo centrado no usuário
        const { productId, quantity } = req.body;

        const useCase = new UpdateCartItemQuantityUseCase();

        try {
            const updatedItem = await useCase.execute(Number(userId), Number(productId), Number(quantity));
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }

    static async clear(req: Request, res: Response) {
        const { userId } = req.params; 

        const useCase = new ClearCartUseCase();

        try {
            const result = await useCase.execute(Number(userId));
            res.status(200).json({ message: result });
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }

    static async getCart(req: Request, res: Response) {
        const { userId } = req.params;
    
        const useCase = new GetCartUseCase();
    
        try {
            const cart = await useCase.executeByUser(Number(userId));
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }
    

    static async finalize(req: Request, res: Response) {
        const { userId } = req.params; // Alinhado ao fluxo centrado no usuário
        const { paymentMethod, addressId } = req.body;

        const useCase = new ConvertCartToOrderUseCase();

        try {
            const order = await useCase.executeByUser(Number(userId), paymentMethod, Number(addressId));
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }
}
