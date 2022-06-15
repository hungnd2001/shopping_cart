import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartDetails } from "./cart_details";
import { OrderDetails } from "./order_details";

@Entity()
class Products {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "name",
    type: "nvarchar",
    length: 255,
  })
  name: string;

  @Column({
    name: "price",
    type: "decimal",
  })
  price: number;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.productId)
  orderdetails: OrderDetails[];

  @OneToMany(() => CartDetails, (cartdetails) => cartdetails.product)
  cartDetails: CartDetails[];
}

export { Products };
