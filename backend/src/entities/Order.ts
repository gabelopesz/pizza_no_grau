import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
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

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onDelete: "CASCADE", // Exclui pedidos associados se o usuário for deletado
  })
  user!: User;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: "orders_products", // Nome da tabela de junção
    joinColumn: { name: "order_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
  })
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
  paymentMethod!: string; // Ex.: "cash_on_delivery", "online_payment"

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt!: Date | null;
}
