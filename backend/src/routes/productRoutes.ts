import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { upload } from "../middleware/uploadMiddleware"; // Middleware para upload de imagens

const productRoutes = Router();
const productController = new ProductController();

// Criar produto com imagem
productRoutes.post("/", upload.single("image"), async (req, res, next) => {
  try {
    req.body.imageUrl = req.file?.path; // Adiciona o caminho da imagem ao corpo da requisição
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

// Editar produto (incluindo imagem, se enviada)
productRoutes.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    req.body.imageUrl = req.file?.path; // Adiciona o caminho da imagem ao corpo da requisição
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
