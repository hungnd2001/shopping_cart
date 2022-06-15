import { Router } from "express";
import { OrderRepository } from "../../services/repository/order_repository";
import { OrdersController } from "../controllers/order_controller";

const ordersController = new OrdersController({
  ordersRepository: new OrderRepository(),
});

const orderRouter = Router();
orderRouter.post("/create", (req, res) => {
  return ordersController.create(req, res);
});

orderRouter.post("/createDetails/:id", (req, res) => {
  return ordersController.createDetails(req, res);
});

orderRouter.get("/getAll", (req, res) => {
  return ordersController.getAll(res);
});

orderRouter.get("/:id", (req, res) => {
  return ordersController.getById(req, res);
});

export default orderRouter;
