import { Address } from "../../entities/Address";
import { AddressRepository } from "../../repositories/AddressRepository";
import { UserRepository } from "../../repositories/UserRepository";

export class CreateAddressUseCase {
    async execute(userId: number, addressData: Partial<Address>) {
        // Verificar se o usuário existe
        const user = await UserRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        // Criar o endereço
        const address = AddressRepository.create({
            ...addressData,
            user,
        });

        // Verificar e configurar endereço padrão
        if (address.isDefault) {
            await AddressRepository.update({ user }, { isDefault: false }); // Desmarcar outros padrões
        }

        return AddressRepository.save(address);
    }
}
