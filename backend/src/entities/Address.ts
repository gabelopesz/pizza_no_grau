import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  zipCode!: string;

  @Column()
  country!: string;

  @Column({ default: false })
  isDefault!: boolean;
  
  @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
  user!: User; 
}
