import { Router } from "express";
import { ConvertCartToOrderUseCase } from "../usecases/Cart/ConvertCartToOrderUseCase";
import { AddProductToCartUseCase } from "../usecases/Cart/AddProductToCartUseCase";
import { RemoveProductFromCartUseCase } from "../usecases/Cart/RemoveProductFromCartUseCase";
import { UpdateCartItemQuantityUseCase } from "../usecases/Cart/UpdateCartItemQuantityUseCase";
import { ClearCartUseCase } from "../usecases/Cart/ClearCartUseCase";
import { GetCartUseCase } from "../usecases/Cart/GetCartUseCase";

const cartRoutes = Router();

cartRoutes.post("/:cartId/add", async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    const useCase = new AddProductToCartUseCase();

    try {
        const result = await useCase.execute(Number(cartId), productId, quantity);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Erro desconhecido." });
        }
    }
});

cartRoutes.delete("/:cartId/remove/:cartItemId", async (req, res) => {
    const { cartItemId } = req.params;

    const useCase = new RemoveProductFromCartUseCase();

    try {
        await useCase.execute(Number(cartItemId));
        res.status(200).json({ message: "Produto removido do carrinho." });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Erro desconhecido." });
        }
    }
});

cartRoutes.put("/:cartId/update/:cartItemId", async (req, res) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const useCase = new UpdateCartItemQuantityUseCase();

    try {
        const result = await useCase.execute(Number(cartItemId), quantity);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Erro desconhecido." });
        }
    }
});

cartRoutes.delete("/:cartId/clear", async (req, res) => {
    const { cartId } = req.params;

    const useCase = new ClearCartUseCase();

    try {
        const result = await useCase.execute(Number(cartId));
        res.status(200).json({ message: result });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Erro desconhecido." });
        }
    }
});

cartRoutes.get("/:cartId", async (req, res) => {
    const { cartId } = req.params;

    const useCase = new GetCartUseCase();

    try {
        const cart = await useCase.execute(Number(cartId));
        res.status(200).json(cart);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Erro desconhecido." });
        }
    }
});

cartRoutes.post("/finalize/:cartId", async (req, res) => {
    const { cartId } = req.params;
    const { paymentMethod } = req.body;

    const useCase = new ConvertCartToOrderUseCase();

    try {
        const order = await useCase.execute(Number(cartId), paymentMethod);
        res.status(200).json(order);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Erro desconhecido." });
        }
    }
});

export { cartRoutes };
