import { Request, Response } from "express";
import { CreateAddressUseCase } from "../usecases/Address/CreateAddressUseCase";
import { ListUserAddressesUseCase } from "../usecases/Address/ListUserAddressesUseCase";
import { FindAddressByIdUseCase } from "../usecases/Address/FindAddressByIdUseCase";
import { DeleteAddressUseCase } from "../usecases/Address/DeleteAddressUseCase";

export class AddressController {
    static async create(req: Request, res: Response) {
        const { userId } = req.params;
        const addressData = req.body;

        const useCase = new CreateAddressUseCase();

        try {
            const address = await useCase.execute(Number(userId), addressData);
            res.status(201).json(address);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    }

    static async list(req: Request, res: Response) {
        const { userId } = req.params;

        const useCase = new ListUserAddressesUseCase();

        try {
            const addresses = await useCase.execute(Number(userId));
            res.status(200).json(addresses);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    }

    static async findById(req: Request, res: Response) {
        const { userId, addressId } = req.params;

        const useCase = new FindAddressByIdUseCase();

        try {
            const address = await useCase.execute(Number(addressId), Number(userId));
            res.status(200).json(address);
        } catch (error) {
            res.status(404).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    }

    static async delete(req: Request, res: Response) {
        const { userId, addressId } = req.params;

        const useCase = new DeleteAddressUseCase();

        try {
            await useCase.execute(Number(addressId), Number(userId));
            res.status(200).json({ message: "Endereço deletado com sucesso." });
        } catch (error) {
            res.status(404).json({ error: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    }
}
