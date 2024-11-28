import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../usecases/Category/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "../usecases/Category/ListCategoriesUseCase";
import { EditCategoryUseCase } from "../usecases/Category/EditCategoryUseCase";
import { DeleteCategoryUseCase } from "../usecases/Category/DeleteCategoryUseCase";

export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listCategoriesUseCase: ListCategoriesUseCase,
    private editCategoryUseCase: EditCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const category = await this.createCategoryUseCase.execute({ name });
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await this.listCategoriesUseCase.execute();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async edit(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await this.editCategoryUseCase.execute({ id: Number(id), name });
      return res.status(200).json({ message: "Categoria atualizada com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteCategoryUseCase.execute(Number(id));
      return res.status(200).json({ message: "Categoria excluída com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
