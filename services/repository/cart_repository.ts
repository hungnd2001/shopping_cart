import AppDataSource from "../../data-source";
import { CartDetailsDto } from "../../dtos/cart_details_dto";
import { CartDto } from "../../dtos/cart_dto";
import { Cart } from "../../models/cart";
import { CartDetails } from "../../models/cart_details";
import { ICartService } from "../interface_repository/interface_cart";

export class CartRepository implements ICartService {
  async create(userId: string): Promise<CartDto> {
    console.log(userId);
    const created = await AppDataSource.manager.create(Cart, {
      userId: userId,
    });

    const cart = await AppDataSource.manager.save(created);

    return {
      id: cart.id,
      userId: cart.userId,
      cartDetails: cart.cartdetails,
    };
  }
  async addProduct(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartDetailsDto> {
    const created = await AppDataSource.manager.create(CartDetails, {
      cartId: cartId,
      productId: productId,
      quantity: quantity,
    });

    const details = await AppDataSource.manager.save(created);

    return {
      cartId: details.cartId,
      productId: details.productId,
      quantity: details.quantity,
    };
  }

  async removeProduct(
    cartId: string,
    productId: string
  ): Promise<CartDetailsDto> {
    const details = await AppDataSource.manager.findOne(CartDetails, {
      where: {
        cartId: cartId,
        productId: productId,
      },
    });

    if (!details) {
      throw new Error("Not found product or cart");
    }

    await AppDataSource.manager.delete(CartDetails, details);

    return {
      cartId: details.cartId,
      productId: details.productId,
      quantity: details.quantity,
      productName: details.product.name,
    };
  }
  async getById(id: string): Promise<CartDto> {
    const cart = await AppDataSource.manager.findOne(Cart, {
      join: {
        alias: "cart",
        innerJoinAndSelect: {
          cartdetails: "cart.cartdetails",
          user: "cart.user",
        },
      },
      where: {
        id: id,
      },
    });

    return {
      id: cart.id,
      userId: cart.userId,
      cartDetails: cart.cartdetails,
    };
  }
}
