import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const orderRoutes = Router();
const orderController = new OrderController();

// Criar pedido
orderRoutes.post("/", async (req, res, next) => {
  try {
    await orderController.create(req, res);
  } catch (error) {
    next(error);
  }
});

// Cancelar pedido
orderRoutes.patch("/:id/cancel", async (req, res, next) => {
  try {
    await orderController.cancel(req, res);
  } catch (error) {
    next(error);
  }
});

// Acompanhar pedido (status)
orderRoutes.get("/:id/track", async (req, res, next) => {
  try {
    await orderController.track(req, res);
  } catch (error) {
    next(error);
  }
});

// Listar pedidos
orderRoutes.get("/", async (req, res, next) => {
  try {
    await orderController.list(req, res);
  } catch (error) {
    next(error);
  }
});

export { orderRoutes };
