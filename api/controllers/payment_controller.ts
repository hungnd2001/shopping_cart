import { Request, Response } from "express";
import { PaymentRepository } from "../../services/repository/payment_repository";

type paymentDependencies = {
  paymentRepository: PaymentRepository;
};

export class PaymentController {
  constructor(private paymentDependencies: paymentDependencies) {}
  async create(req: Request, res: Response) {
    const body = req.body;

    const payment = await this.paymentDependencies.paymentRepository.create(
      body.orderId,
      body.amount
    );

    return res.status(201).json(payment);
  }

  async getById(req: Request, res: Response) {}
}
