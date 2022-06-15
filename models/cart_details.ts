import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cart } from "./cart";
import { Products } from "./products";

@Entity()
class CartDetails {
  @PrimaryColumn({
    name: "cart_id",
    type: "uuid",
  })
  @Column({
    name: "cart_id",
    type: "uuid",
  })
  cartId: string;

  @PrimaryColumn({
    name: "product_id",
    type: "uuid",
  })
  productId: string;

  @Column({
    name: "quantity",
    type: "int",
  })
  quantity: number;

  @ManyToOne(() => Products, (product) => product.cartDetails)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: Products;

  @ManyToOne(() => Cart, (cart) => cart.cartdetails)
  @JoinColumn({
    name: "cart_id",
    referencedColumnName: "id",
  })
  cart: CartDetails;
}

export { CartDetails };
