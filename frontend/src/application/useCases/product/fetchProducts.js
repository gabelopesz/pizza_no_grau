import { ProductRepository } from "../../../infraestructure/repositories/ProductRepository";

export const fetchProducts = async (onlyActive = true) => {
  const repository = new ProductRepository();
  try {
    return await repository.list(onlyActive); 
  } catch (error) {
    console.error("Erro no fetchProducts:", error);
    return []; 
  }
};
