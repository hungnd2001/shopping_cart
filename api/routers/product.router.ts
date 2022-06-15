import { Router } from "express";
import { ProductRepository } from "../../services/repository/product_repository";
import { JwtDecode } from "../../ultilities/decode";
import { ProductsController } from "../controllers/products_controller";

const productsController = new ProductsController({
  productRepository: new ProductRepository(),
  jwtDecode: new JwtDecode(),
});

const authRouter = Router();
authRouter.post("/create", (req, res) => {
  return productsController.create(req, res);
});

authRouter.patch("/update/:id", (req, res) => {
  return productsController.update(req, res);
});

authRouter.delete("/delete/:id", (req, res) => {
  return productsController.delete(req, res);
});

authRouter.get("/getAll", (req, res) => {
  return productsController.getAll(req, res);
});

authRouter.get("/getById/:id", (req, res) => {
  return productsController.getById(req, res);
});

export default authRouter;
