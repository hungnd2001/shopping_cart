import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartDetails } from "./cart_details";
import { Users } from "./users";

@Entity()
class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "user_id",
    type: "uuid",
  })
  userId: string;

  @OneToMany(() => CartDetails, (cartDetails) => cartDetails.cart)
  cartdetails: CartDetails[];

  @OneToOne(() => Users, (user) => user.cart)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: Users;
}

export { Cart };
