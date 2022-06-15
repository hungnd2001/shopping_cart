import { Request, Response } from "express";
import { AuthRepository } from "../../services/repository/auth_repository";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import { UserDto } from "../../dtos/user_dto";

type AuthDependencies = {
  authRepository: AuthRepository;
};

export class AuthControllers {
  constructor(private authDependencies: AuthDependencies) {}
  async login(req: Request, res: Response) {
    console.log("req", req.body);
    try {
      const body = req.body;
      const user = await this.authDependencies.authRepository.login(
        body.username,
        body.password
      );

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: "sss" });
    }
  }

  async register(req: Request, res: Response) {
    const body = req.body;
    const user = await this.authDependencies.authRepository.register(
      body.username,
      body.password
    );

    return res.status(201).json(user);
  }
}
