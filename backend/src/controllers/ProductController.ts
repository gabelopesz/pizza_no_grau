import { Request, Response } from "express";
import { CreateProductUseCase } from "../usecases/Product/CreateProductUseCase";
import { ListProductsUseCase } from "../usecases/Product/ListProductsUseCase";
import { EditProductUseCase } from "../usecases/Product/EditProductUseCase";
import { ChangeProductStatusUseCase } from "../usecases/Product/ChangeProductStatusUseCase";

export class ProductController {
  // Criar Produto
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, description, categoryId } = req.body;
      const imageUrl = req.file?.path; // Captura o caminho do arquivo enviado

      const createProduct = new CreateProductUseCase();
      const product = await createProduct.execute({
        name,
        price,
        description,
        categoryId,
        imageUrl,
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  // Listar Produtos
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { onlyActive } = req.query;
      const listProducts = new ListProductsUseCase();
      const products = await listProducts.execute(onlyActive === "true");
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  // Editar Produto
  async edit(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, price, description, categoryId } = req.body;
      const imageUrl = req.file?.path; // Captura o caminho do arquivo enviado, caso exista

      const editProduct = new EditProductUseCase();
      await editProduct.execute({
        id: Number(id),
        name,
        price,
        description,
        categoryId,
        imageUrl, // Inclui a imagem no caso de uso
      });

      return res.status(200).json({ message: "Produto atualizado com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  // Desativar Produto
  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const changeProductStatus = new ChangeProductStatusUseCase();
      await changeProductStatus.execute(Number(id), false);
      return res.status(200).json({ message: "Produto desativado com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  // Reativar Produto
  async activate(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const changeProductStatus = new ChangeProductStatusUseCase();
      await changeProductStatus.execute(Number(id), true);
      return res.status(200).json({ message: "Produto ativado com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
