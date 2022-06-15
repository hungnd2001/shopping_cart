import { Router } from "express";
import { CartRepository } from "../../services/repository/cart_repository";
import { CartController } from "../controllers/cart_controller";

const cartController = new CartController({
  cartRepository: new CartRepository(),
});

const cartRouter = Router();
cartRouter.post("/create", (req, res) => {
  return cartController.create(req, res);
});

cartRouter.post("/addProduct", (req, res) => {
  return cartController.addProduct(req, res);
});

cartRouter.get("/getById/:id", (req, res) => {
  return cartController.getById(req, res);
});

export default cartRouter;
