import { Router } from "express";
import { AddressController } from "../controllers/AddressController";

const addressRoutes = Router();

// Adicionar endereço
addressRoutes.post("/:userId", AddressController.create);

// Listar endereços
addressRoutes.get("/:userId", AddressController.list);

// Buscar endereço específico
addressRoutes.get("/:userId/:addressId", AddressController.findById);

// Deletar endereço
addressRoutes.delete("/:userId/:addressId", AddressController.delete);

export { addressRoutes };
