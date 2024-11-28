import { Router, Request, Response, NextFunction } from "express";
import { ProductController } from "../controllers/ProductController";
import { upload } from "../middleware/uploadMiddleware"; // Middleware para upload de imagens

const productRoutes = Router();
const productController = new ProductController();

// Middleware genérico para tratamento de erros
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Criar produto com imagem
productRoutes.post(
  "/",
  upload.single("image"),
  asyncHandler(async (req: Request, res: Response) => {
    req.body.imageUrl = req.file?.path;
    await productController.create(req, res);
  })
);

// Listar produtos
productRoutes.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await productController.list(req, res);
  })
);

// Mostrar detalhes de um produto
productRoutes.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    await productController.show(req, res);
  })
);

// Editar produto (incluindo upload de nova imagem, se enviada)
productRoutes.put(
  "/:id",
  upload.single("image"),
  asyncHandler(async (req: Request, res: Response) => {
    req.body.imageUrl = req.file?.path;
    await productController.edit(req, res);
  })
);

// Desativar produto
productRoutes.patch(
  "/:id/deactivate",
  asyncHandler(async (req: Request, res: Response) => {
    await productController.deactivate(req, res);
  })
);

// Reativar produto
productRoutes.patch(
  "/:id/activate",
  asyncHandler(async (req: Request, res: Response) => {
    await productController.activate(req, res);
  })
);

export { productRoutes };
