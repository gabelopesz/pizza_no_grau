import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { Cart } from "./Cart";
import { Address } from "./Address";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  @JoinColumn()
  cart!: Cart;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses!: Address[]; 
}
