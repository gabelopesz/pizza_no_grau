import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column("decimal")
  discount!: number; 
}
