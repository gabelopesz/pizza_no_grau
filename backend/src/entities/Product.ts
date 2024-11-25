import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";
import { Order } from "./Order";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column()
  description!: string;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  category!: Category;

  @ManyToMany(() => Order, (order) => order.products)
  @JoinTable()
  orders!: Order[];

  @Column({ default: true })
  isActive!: boolean;
}
