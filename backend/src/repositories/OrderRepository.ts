import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Order } from "../entities/Order";

export const OrderRepository: Repository<Order> = AppDataSource.getRepository(Order);
