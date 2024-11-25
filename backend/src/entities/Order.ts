import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("decimal")
  total!: number;

  @Column()
  status!: string;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;
}
