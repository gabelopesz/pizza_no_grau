import {
    fetchCategories,
    createCategory,
    updateCategory,
    removeCategory,
  } from "../api/categoryApi.js";
  
  export class CategoryRepository {
    async list() {
      return await fetchCategories();
    }
  
    async add(category) {
      return await createCategory(category);
    }
  
    async update(id, updatedCategory) {
      return await updateCategory(id, updatedCategory);
    }
  
    async delete(id) {
      return await removeCategory(id);
    }
  }
  