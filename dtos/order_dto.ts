import { OrderDetails } from "../models/order_details";

export class OrderDto {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  orderDetails: OrderDetails[];
}
