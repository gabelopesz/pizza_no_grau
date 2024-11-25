import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

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

  @ManyToOne(() => Category, (category) => category.products, { nullable: true })
  category!: Category | null;

  @Column({ default: true })
  isActive!: boolean;
}
