import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./orders";

@Entity()
class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "order_id",
    type: "uuid",
  })
  orderId: string;

  @Column({
    name: "amount",
    type: "decimal",
  })
  amount: number;

  @Column({
    name: "time_pay",
    type: "datetime",
  })
  timePay: string;

  @OneToOne(() => Orders, (order) => order.orderdetails)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "id",
  })
  order: Orders;
}

export { Payment };
