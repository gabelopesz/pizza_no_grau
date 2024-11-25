import { CategoryRepository } from "../../repositories/CategoryRepository";

export class ListCategoriesUseCase {
  async execute(): Promise<any[]> {
    return await CategoryRepository.find({
      relations: ["products"], 
    });
  }
}
