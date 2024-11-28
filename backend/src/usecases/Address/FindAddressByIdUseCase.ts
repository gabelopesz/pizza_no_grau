import { AddressRepository } from "../../repositories/AddressRepository";

export class FindAddressByIdUseCase {
    async execute(addressId: number, userId: number) {
        const address = await AddressRepository.findOne({
            where: { id: addressId, user: { id: userId } },
        });

        if (!address) {
            throw new Error("Endereço não encontrado ou não pertence ao usuário.");
        }

        return address;
    }
}
