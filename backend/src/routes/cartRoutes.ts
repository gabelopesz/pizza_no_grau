import { Router } from "express";
import { CartController } from "../controllers/CartController";

const cartRoutes = Router();

cartRoutes.post("/:cartId/add", CartController.addProduct);
cartRoutes.delete("/:cartId/remove/:cartItemId", CartController.removeProduct);
cartRoutes.put("/:cartId/update/:cartItemId", CartController.updateQuantity);
cartRoutes.delete("/:cartId/clear", CartController.clear);
cartRoutes.get("/:cartId", CartController.getCart);
cartRoutes.post("/finalize/:cartId", CartController.finalize);

export { cartRoutes };
