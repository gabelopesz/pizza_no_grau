import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const orderRoutes = Router();
const orderController = new OrderController();

// Criar pedido
orderRoutes.post("/users/:userId", async (req, res, next) => {
  try {
    await orderController.create(req, res);
  } catch (error) {
    next(error);
  }
});

// Cancelar pedido
orderRoutes.patch("/users/:userId/:orderId/cancel", async (req, res, next) => {
  try {
    await orderController.cancel(req, res);
  } catch (error) {
    next(error);
  }
});

// Acompanhar pedido (status)
orderRoutes.get("/users/:userId/:orderId/track", async (req, res, next) => {
  try {
    await orderController.track(req, res);
  } catch (error) {
    next(error);
  }
});

// Listar pedidos (opcionalmente por usuário)
orderRoutes.get("/", async (req, res, next) => {
  try {
    await orderController.list(req, res);
  } catch (error) {
    next(error);
  }
});

// Finalizar pedido
orderRoutes.patch("/users/:userId/:orderId/complete", async (req, res, next) => {
  try {
    await orderController.complete(req, res);
  } catch (error) {
    next(error);
  }
});

export { orderRoutes };
