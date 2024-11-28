import { CategoryController } from "../CategoryController";
import { CreateCategoryUseCase } from "../../usecases/Category/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "../../usecases/Category/ListCategoriesUseCase";
import { EditCategoryUseCase } from "../../usecases/Category/EditCategoryUseCase";
import { DeleteCategoryUseCase } from "../../usecases/Category/DeleteCategoryUseCase";
import { Request, Response } from "express";

jest.mock("../../usecases/Category/CreateCategoryUseCase");
jest.mock("../../usecases/Category/ListCategoriesUseCase");
jest.mock("../../usecases/Category/EditCategoryUseCase");
jest.mock("../../usecases/Category/DeleteCategoryUseCase");

describe("CategoryController", () => {
  const mockResponse = (): Partial<Response> => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  });

  let createCategoryUseCaseMock: jest.Mocked<CreateCategoryUseCase>;
  let listCategoriesUseCaseMock: jest.Mocked<ListCategoriesUseCase>;
  let editCategoryUseCaseMock: jest.Mocked<EditCategoryUseCase>;
  let deleteCategoryUseCaseMock: jest.Mocked<DeleteCategoryUseCase>;

  beforeEach(() => {
    createCategoryUseCaseMock = new (CreateCategoryUseCase as jest.Mock)() as jest.Mocked<CreateCategoryUseCase>;
    listCategoriesUseCaseMock = new (ListCategoriesUseCase as jest.Mock)() as jest.Mocked<ListCategoriesUseCase>;
    editCategoryUseCaseMock = new (EditCategoryUseCase as jest.Mock)() as jest.Mocked<EditCategoryUseCase>;
    deleteCategoryUseCaseMock = new (DeleteCategoryUseCase as jest.Mock)() as jest.Mocked<DeleteCategoryUseCase>;
  });

  describe("create", () => {
    it("should return 201 when a category is created successfully", async () => {
      const mockCategory = { id: 1, name: "Pizza", products: [] };
      createCategoryUseCaseMock.execute.mockResolvedValue(mockCategory);

      const categoryController = new CategoryController(
        createCategoryUseCaseMock,
        listCategoriesUseCaseMock,
        editCategoryUseCaseMock,
        deleteCategoryUseCaseMock
      );
      const req = { body: { name: "Pizza" } } as Partial<Request>;
      const res = mockResponse();

      await categoryController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    it("should return 400 if creation fails", async () => {
      createCategoryUseCaseMock.execute.mockRejectedValue(new Error("Creation failed"));

      const categoryController = new CategoryController(
        createCategoryUseCaseMock,
        listCategoriesUseCaseMock,
        editCategoryUseCaseMock,
        deleteCategoryUseCaseMock
      );
      const req = { body: { name: "" } } as Partial<Request>;
      const res = mockResponse();

      await categoryController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Creation failed" });
    });
  });

  describe("list", () => {
    it("should return 200 with a list of categories", async () => {
      const mockCategories = [
        { id: 1, name: "Pizza", products: [] },
        { id: 2, name: "Drinks", products: [] },
      ];
      listCategoriesUseCaseMock.execute.mockResolvedValue(mockCategories);

      const categoryController = new CategoryController(
        createCategoryUseCaseMock,
        listCategoriesUseCaseMock,
        editCategoryUseCaseMock,
        deleteCategoryUseCaseMock
      );
      const req = {} as Partial<Request>;
      const res = mockResponse();

      await categoryController.list(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it("should return 400 if listing fails", async () => {
      listCategoriesUseCaseMock.execute.mockRejectedValue(new Error("Listing failed"));

      const categoryController = new CategoryController(
        createCategoryUseCaseMock,
        listCategoriesUseCaseMock,
        editCategoryUseCaseMock,
        deleteCategoryUseCaseMock
      );
      const req = {} as Partial<Request>;
      const res = mockResponse();

      await categoryController.list(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Listing failed" });
    });
  });

  describe("edit", () => {
    it("should return 200 when a category is updated successfully", async () => {
      editCategoryUseCaseMock.execute.mockResolvedValue(undefined);

      const categoryController = new CategoryController(
        createCategoryUseCaseMock,
        listCategoriesUseCaseMock,
        editCategoryUseCaseMock,
        deleteCategoryUseCaseMock
      );
      const req = { params: { id: "1" }, body: { name: "Updated Name" } } as Partial<Request>;
      const res = mockResponse();

      await categoryController.edit(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Categoria atualizada com sucesso." });
    });
  });

  describe("delete", () => {
    it("should return 200 when a category is deleted successfully", async () => {
      deleteCategoryUseCaseMock.execute.mockResolvedValue(undefined);

      const categoryController = new CategoryController(
        createCategoryUseCaseMock,
        listCategoriesUseCaseMock,
        editCategoryUseCaseMock,
        deleteCategoryUseCaseMock
      );
      const req = { params: { id: "1" } } as Partial<Request>;
      const res = mockResponse();

      await categoryController.delete(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Categoria excluída com sucesso." });
    });

    it("should return 400 if deletion fails", async () => {
      deleteCategoryUseCaseMock.execute.mockRejectedValue(new Error("Deletion failed"));

      const categoryController = new CategoryController(
        createCategoryUseCaseMock,
        listCategoriesUseCaseMock,
        editCategoryUseCaseMock,
        deleteCategoryUseCaseMock
      );
      const req = { params: { id: "1" } } as Partial<Request>;
      const res = mockResponse();

      await categoryController.delete(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Deletion failed" });
    });
  });
});
