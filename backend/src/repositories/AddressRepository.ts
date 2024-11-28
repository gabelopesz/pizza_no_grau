import { Repository } from "typeorm";
import { Address } from "../entities/Address";
import { AppDataSource } from "../config/database";

export const AddressRepository: Repository<Address> = AppDataSource.getRepository(Address);
