import AppDataSource from "../../data-source";
import { PaymentDto } from "../../dtos/payment_dto";
import { ErrorDto } from "../../errors/error_dto";
import { Payment } from "../../models/payment";
import { IPaymentService } from "../interface_repository/interface_payment";

export class PaymentRepository implements IPaymentService {
  async create(orderId: string, amount: number): Promise<PaymentDto> {
    const payDate = new Date().toISOString();

    const created = await AppDataSource.manager.create(Payment, {
      orderId: orderId,
      amount: amount,
      timePay: payDate,
    });

    const payment = await AppDataSource.manager.save(created);

    return {
      id: payment.id,
      orderId: payment.orderId,
      amount: payment.amount,
      payDate: payment.timePay,
    };
  }
  async getById(id: string): Promise<PaymentDto | ErrorDto> {
    console.log("id" + id);
    try {
      const payment = await AppDataSource.manager.findOne(Payment, {
        where: {
          id: id,
        },
      });

      return {
        id: payment.id,
        amount: payment.amount,
        orderId: payment.orderId,
        payDate: payment.timePay,
      };
    } catch (er) {
      return {
        payload: { id },
        message: "Not Found payment",
      };
    }
  }
  async getAll(): Promise<PaymentDto[]> {
    const paymentList = await AppDataSource.manager.find(Payment);
    return [];
  }
}
