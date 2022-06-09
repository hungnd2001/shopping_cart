import "reflect-metadata"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Orders } from "./orders";

@Entity()
class Users {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column(
        {
            name: 'name',
            type: 'varchar',
            length: 255
        }
    )
    name: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255
    })
    password: string;


    @OneToMany(() => Orders, (order) => order.userId)
    orderdetails: Orders[]
}

export { Users }