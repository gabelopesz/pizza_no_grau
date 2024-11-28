import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Product } from "./Product";
import { Cart } from "./Cart";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Cart, cart => cart.items, { onDelete: "CASCADE" })
    cart!: Cart;

    @ManyToOne(() => Product, { eager: true }) // Carregar os detalhes do produto automaticamente
    product!: Product;

    @Column()
    quantity!: number;
}
