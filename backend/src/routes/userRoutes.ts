import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

// Criar usuário
userRoutes.post("/", async (req, res, next) => {
  try {
    await userController.create(req, res);
  } catch (error) {
    next(error);
  }
});

// Listar usuários
userRoutes.get("/", async (req, res, next) => {
  try {
    await userController.list(req, res);
  } catch (error) {
    next(error);
  }
});

// Editar usuário
userRoutes.put("/:id", async (req, res, next) => {
  try {
    await userController.edit(req, res);
  } catch (error) {
    next(error);
  }
});

// Desativar usuário
userRoutes.patch("/:id/deactivate", async (req, res, next) => {
  try {
    await userController.deactivate(req, res);
  } catch (error) {
    next(error);
  }
});

// Reativar usuário
userRoutes.patch("/:id/activate", async (req, res, next) => {
  try {
    await userController.activate(req, res);
  } catch (error) {
    next(error);
  }
});

export { userRoutes };
