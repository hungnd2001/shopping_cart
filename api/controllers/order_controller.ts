import { Request, Response } from "express";
import { OrderRepository } from "../../services/repository/order_repository";

type OrderDependencies = {
  ordersRepository: OrderRepository;
};

export class OrdersController {
  constructor(private orderDependencies: OrderDependencies) {}

  async create(req: Request, res: Response) {
    const body = req.body;

    const order = await this.orderDependencies.ordersRepository.createOrder(
      body.userId
    );

    return res.status(201).json(order);
  }

  async createDetails(req: Request, res: Response) {
    const body = req.body;

    const orderDetails =
      await this.orderDependencies.ordersRepository.createDetails(
        body.orderId,
        body.productId,
        body.quantity
      );

    return res.status(201).json(orderDetails);
  }

  async getById(req: Request, res: Response) {
    console.log("Req" + req.params.id);
    const order = await this.orderDependencies.ordersRepository.getById(
      req.params.id
    );

    return res.status(200).json(order);
  }

  async getAll(res: Response) {
    const orderList = await this.orderDependencies.ordersRepository.getAll();
    return res.status(200).json(orderList);
  }
}
