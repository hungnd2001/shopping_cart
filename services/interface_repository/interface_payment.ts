import { PaymentDto } from "../../dtos/payment_dto";
import { ErrorDto } from "../../errors/error_dto";

export interface IPaymentService {
  create(orderId: string, amount: number): Promise<PaymentDto | ErrorDto>;
  getById(id: string): Promise<PaymentDto | ErrorDto>;
  getAll(): Promise<PaymentDto[] | ErrorDto>;
}
