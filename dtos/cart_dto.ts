import { CartDetails } from "../models/cart_details";

export class CartDto {
  id: string;
  userId: string;
  cartDetails: CartDetails[];
}
