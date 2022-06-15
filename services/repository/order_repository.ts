import AppDataSource from "../../data-source";
import { OrderDetailsDto } from "../../dtos/order_details_dto";
import { OrderDto } from "../../dtos/order_dto";
import { Orders } from "../../models/orders";
import { OrderDetails } from "../../models/order_details";
import { Users } from "../../models/users";
import { IOrderService } from "../interface_repository/interface_order";

export class OrderRepository implements IOrderService {
  async getById(id: string): Promise<OrderDto> {
    const order = await AppDataSource.manager.findOne(Orders, {
      join: {
        alias: "order",
        innerJoinAndSelect: {
          orderdetails: "order.orderdetails",
          user: "order.user",
        },
      },

      where: {
        id: id,
      },
    });

    const orderDetail = await AppDataSource.getRepository(OrderDetails)
      .createQueryBuilder("orderdetails")
      .innerJoin("orderdetails.product", "product")
      .select("sum(product.price*orderdetails.quantity)", "sum")
      .where("orderdetails.orderId = :id", { id: order.id })
      .getRawOne();

    return {
      id: order.id,
      userId: order.userId,
      userName: order.user.name,
      amount: parseFloat(orderDetail["sum"]),
      orderDetails: order.orderdetails,
    };
  }

  async createDetails(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<OrderDetailsDto> {
    const order = await AppDataSource.manager.findOne(Orders, {
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error("Not found order");
    } else {
      const created = await AppDataSource.manager.create(OrderDetails, {
        orderId: orderId,
        productId: productId,
        quantity: quantity,
      });

      const details = await AppDataSource.manager.save(created);
      return {
        orderId: details.orderId,
        productId: details.productId,
        productName: details.product.name,
        quantity: details.quantity,
      };
    }
  }
  async createOrder(userId: string): Promise<OrderDto> {
    const user = await AppDataSource.manager.findOne(Users, {
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Not found user");
    }

    const created = await AppDataSource.manager.create(Orders, {
      userId: userId,
    });

    const order = await AppDataSource.manager.save(created);

    return {
      id: order.id,
      userId: order.userId,
      amount: 0,
      userName: user.name,
      orderDetails: [],
    };
  }
  getAll(): Promise<OrderDto[]> {
    throw new Error("");
  }
}
