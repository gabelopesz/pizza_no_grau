import { CreateCategoryUseCase } from "../../usecases/Category/CreateCategoryUseCase";
import { CategoryController } from "../CategoryController";

jest.mock("../../usecases/Category/CreateCategoryUseCase");

describe("CategoryController - create", () => {
  it("should throw if category name is invalid", async () => {
    // Configurando o mock do método execute
    const createCategoryUseCaseMock = new (CreateCategoryUseCase as jest.Mock)();
    createCategoryUseCaseMock.execute = jest.fn().mockRejectedValue(new Error("Invalid category name"));

    // Criando o controller com o caso de uso mockado
    const categoryController = new CategoryController(createCategoryUseCaseMock);

    // Mock dos objetos req e res
    const req = { body: { name: "" } }; // Categoria inválida
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await categoryController.create(req as any, res as any);

    // Verificações
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid category name" });
  });

  it("should return 201 if category is created successfully", async () => {
    // Configurando o mock do método execute
    const createCategoryUseCaseMock = new (CreateCategoryUseCase as jest.Mock)();
    createCategoryUseCaseMock.execute = jest.fn().mockResolvedValue({ id: 1, name: "Pizza" });

    // Criando o controller com o caso de uso mockado
    const categoryController = new CategoryController(createCategoryUseCaseMock);

    // Mock dos objetos req e res
    const req = { body: { name: "Pizza" } }; // Categoria válida
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await categoryController.create(req as any, res as any);

    // Verificações
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Pizza" });
  });
});