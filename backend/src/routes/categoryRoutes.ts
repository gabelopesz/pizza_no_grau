import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoryRoutes = Router();
const categoryController = new CategoryController();

// Criar categoria
categoryRoutes.post("/", async (req, res, next) => {
  try {
    await categoryController.create(req, res);
  } catch (error) {
    next(error);
  }
});

// Listar categorias
categoryRoutes.get("/", async (req, res, next) => {
  try {
    await categoryController.list(req, res);
  } catch (error) {
    next(error);
  }
});

// Editar categoria
categoryRoutes.put("/:id", async (req, res, next) => {
  try {
    await categoryController.edit(req, res);
  } catch (error) {
    next(error);
  }
});

// Excluir categoria
categoryRoutes.delete("/:id", async (req, res, next) => {
  try {
    await categoryController.delete(req, res);
  } catch (error) {
    next(error);
  }
});

export { categoryRoutes };
