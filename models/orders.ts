import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { OrderDetails } from "./order_details";
import { Users } from "./users"

@Entity()
class Orders {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Users, (user) => user.id)
    userId: Users;

    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.orderId)
    orderdetails: OrderDetails[]
}

export { Orders }