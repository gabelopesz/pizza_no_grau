import { Repository } from "typeorm";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { AppDataSource } from "../config/database";

export const CartRepository = AppDataSource.getRepository(Cart);
export const CartItemRepository = AppDataSource.getRepository(CartItem);
