import { CartDetailsDto } from "../../dtos/cart_details_dto";
import { CartDto } from "../../dtos/cart_dto";
import { ErrorDto } from "../../errors/error_dto";
import { Cart } from "../../models/cart";

export interface ICartService {
  create(userId: string): Promise<CartDto | ErrorDto>;
  addProduct(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartDetailsDto | ErrorDto>;
  removeProduct(
    cartId: string,
    productId: string
  ): Promise<CartDetailsDto | ErrorDto>;
  getById(id: string): Promise<CartDto | ErrorDto>;
}
