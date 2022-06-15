import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { OrderDetails } from "./order_details";
import { Payment } from "./payment";
import { Users } from "./users";

@Entity()
class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "user_id",
  })
  userId: string;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderdetails: OrderDetails[];

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: Users;

  @OneToOne(() => Payment, (payment) => payment.order)
  payments: Payment;
}

export { Orders };
