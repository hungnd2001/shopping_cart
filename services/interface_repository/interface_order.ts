import { OrderDetailsDto } from "../../dtos/order_details_dto";
import { OrderDto } from "../../dtos/order_dto";
import { ErrorDto } from "../../errors/error_dto";

export interface IOrderService {
  createOrder(userId: string): Promise<OrderDto | ErrorDto>;
  createDetails(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<OrderDetailsDto | ErrorDto>;
  getAll(): Promise<OrderDto[] | ErrorDto>;
  getById(id: string): Promise<OrderDto | ErrorDto>;
}
