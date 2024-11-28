import { AddressRepository } from "../../repositories/AddressRepository";

export class ListUserAddressesUseCase {
    async execute(userId: number) {
        return AddressRepository.find({
            where: { user: { id: userId } },
            order: { isDefault: "DESC" }, 
        });
    }
}
