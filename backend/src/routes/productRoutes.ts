import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRoutes = Router();
const productController = new ProductController();

// Criar produto
productRoutes.post("/", async (req, res, next) => {
  try {
    await productController.create(req, res);
  } catch (error) {
    next(error);
  }
});

// Listar produtos
productRoutes.get("/", async (req, res, next) => {
  try {
    await productController.list(req, res);
  } catch (error) {
    next(error);
  }
});

// Editar produto
productRoutes.put("/:id", async (req, res, next) => {
  try {
    await productController.edit(req, res);
  } catch (error) {
    next(error);
  }
});

// Desativar produto
productRoutes.patch("/:id/deactivate", async (req, res, next) => {
  try {
    await productController.deactivate(req, res);
  } catch (error) {
    next(error);
  }
});

// Reativar produto
productRoutes.patch("/:id/activate", async (req, res, next) => {
  try {
    await productController.activate(req, res);
  } catch (error) {
    next(error);
  }
});

export { productRoutes };
