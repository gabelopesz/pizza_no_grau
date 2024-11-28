import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../usecases/Category/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "../usecases/Category/ListCategoriesUseCase";
import { EditCategoryUseCase } from "../usecases/Category/EditCategoryUseCase";
import { DeleteCategoryUseCase } from "../usecases/Category/DeleteCategoryUseCase";

export class CategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;

  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

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
      const listCategories = new ListCategoriesUseCase();
      const categories = await listCategories.execute();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async edit(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const editCategory = new EditCategoryUseCase();
      await editCategory.execute({ id: Number(id), name });
      return res.status(200).json({ message: "Categoria atualizada com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleteCategory = new DeleteCategoryUseCase();
      await deleteCategory.execute(Number(id));
      return res.status(200).json({ message: "Categoria excluída com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
