import { Router } from "express";
import { AuthRepository } from "../../services/repository/auth_repository";
import { AuthControllers } from "../controllers/auth_controller";

const authController = new AuthControllers({
  authRepository: new AuthRepository(),
});

const authRouter = Router();
authRouter.post("/login", (req, res) => {
  return authController.login(req, res);
});

authRouter.post("/register", (req, res) => {
  return authController.register(req, res);
});

export default authRouter;
