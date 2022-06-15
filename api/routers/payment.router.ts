import { Router } from "express";
import { PaymentRepository } from "../../services/repository/payment_repository";
import { PaymentController } from "../controllers/payment_controller";

const paymentController = new PaymentController({
  paymentRepository: new PaymentRepository(),
});

const paymentRouter = Router();
paymentRouter.post("/create", (req, res) => {
  return paymentController.create(req, res);
});

paymentRouter.get("/:id", (req, res) => {
  return paymentController.getById(req, res);
});

export default paymentRouter;
