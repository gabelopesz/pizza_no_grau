import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

export enum OrderStatus {
  PENDENTE = "pendente",
  VALIDADO = "validado",
  CANCELADO = "cancelado",
  CONCLUIDO = "concluido",
}

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user!: User;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products!: Product[];

  @Column("decimal", { precision: 10, scale: 2 })
  totalPrice!: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDENTE,
  })
  status!: OrderStatus;

  @Column()
  paymentMethod!: string; // "cash_on_delivery", "online_payment"

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt!: Date | null;
}
