import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn, Column } from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";
import { Order } from "./Order";

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.cart, { onDelete: "CASCADE" })
    user!: User;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
    items!: CartItem[];

    @Column({ default: false })
    isOrder!: boolean; // Indica se o carrinho foi convertido em pedido

    @OneToOne(() => Order, { nullable: true })
    @JoinColumn()
    order!: Order | null; // Pedido associado ao carrinho
}
