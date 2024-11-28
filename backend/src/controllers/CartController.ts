import { Request, Response } from "express";
import { AddProductToCartUseCase } from "../usecases/Cart/AddProductToCartUseCase";
import { RemoveProductFromCartUseCase } from "../usecases/Cart/RemoveProductFromCartUseCase";
import { UpdateCartItemQuantityUseCase } from "../usecases/Cart/UpdateCartItemQuantityUseCase";
import { ClearCartUseCase } from "../usecases/Cart/ClearCartUseCase";
import { GetCartUseCase } from "../usecases/Cart/GetCartUseCase";
import { ConvertCartToOrderUseCase } from "../usecases/Cart/ConvertCartToOrderUseCase";

export class CartController {
    static async addProduct(req: Request, res: Response) {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        const useCase = new AddProductToCartUseCase();

        try {
            const result = await useCase.execute(Number(cartId), productId, quantity);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }

    static async removeProduct(req: Request, res: Response) {
        const { cartItemId } = req.params;

        const useCase = new RemoveProductFromCartUseCase();

        try {
            await useCase.execute(Number(cartItemId));
            res.status(200).json({ message: "Produto removido do carrinho." });
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }

    static async updateQuantity(req: Request, res: Response) {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        const useCase = new UpdateCartItemQuantityUseCase();

        try {
            const result = await useCase.execute(Number(cartItemId), quantity);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }

    static async clear(req: Request, res: Response) {
        const { cartId } = req.params;

        const useCase = new ClearCartUseCase();

        try {
            const result = await useCase.execute(Number(cartId));
            res.status(200).json({ message: result });
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }

    static async getCart(req: Request, res: Response) {
        const { cartId } = req.params;

        const useCase = new GetCartUseCase();

        try {
            const cart = await useCase.execute(Number(cartId));
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }

    static async finalize(req: Request, res: Response) {
        const { cartId } = req.params;
        const { paymentMethod, addressId } = req.body;

        const useCase = new ConvertCartToOrderUseCase();

        try {
            const order = await useCase.execute(Number(cartId), paymentMethod, Number(addressId));
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
        }
    }
}
