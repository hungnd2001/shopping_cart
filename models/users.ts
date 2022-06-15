import "reflect-metadata";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Cart } from "./cart";

import { Orders } from "./orders";

@Entity()
class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "name",
    type: "varchar",
    length: 255,
  })
  name: string;

  @Column({
    name: "password",
    type: "varchar",
    length: 255,
  })
  password: string;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}

export { Users };
