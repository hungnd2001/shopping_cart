import "reflect-metadata";
import {
  Entity,
  ManyToOne,
  OneToOne,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Orders } from "./orders";
import { Products } from "./products";

@Entity()
class OrderDetails {
  @PrimaryColumn({
    name: "order_id",
    type: "uuid",
  })
  orderId: string;

  @PrimaryColumn({
    name: "product_id",
    type: "uuid",
  })
  productId: string;

  @ManyToOne(() => Orders, (order) => order.orderdetails)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "id",
  })
  order: Orders;

  @ManyToOne(() => Products, (product) => product.orderdetails)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: Products;

  @Column()
  quantity: number;
}

export { OrderDetails };
