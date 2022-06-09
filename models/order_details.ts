import "reflect-metadata"
import { ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders"
import { Products } from "./products"

class OrderDetails {

    @ManyToOne(() => Orders, (order) => order.id)
    @PrimaryColumn()
    orderId: string;

    @PrimaryColumn()
    @ManyToOne(() => Products, (product) => product.id)
    productId: string;

    quantity: number;

}

export { OrderDetails }