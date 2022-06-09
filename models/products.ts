import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { OrderDetails } from "./order_details";

@Entity()
class Products {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;


    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.productId)
    orderdetails: OrderDetails[]
}

export { Products };