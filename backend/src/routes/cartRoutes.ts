import { Router } from "express";
import { CartController } from "../controllers/CartController";

const cartRoutes = Router();

// Adicionar produto ao carrinho do usuário
cartRoutes.post("/:userId/item", CartController.addProduct);
cartRoutes.delete("/:userId/item", CartController.removeProduct);
cartRoutes.put("/:userId/item", CartController.updateQuantity);
cartRoutes.delete("/:userId", CartController.clear);
cartRoutes.get("/:userId", CartController.getCart);
cartRoutes.post("/:userId/finalize", CartController.finalize);

export { cartRoutes };
