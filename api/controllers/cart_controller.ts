import { Request, Response } from "express";
import config from "../../config";
import { checkJwt } from "../../middlewares/check_jwt";
import { CartRepository } from "../../services/repository/cart_repository";
import * as jwt from "jsonwebtoken";

type cartDependencies = {
  cartRepository: CartRepository;
};

export class CartController {
  constructor(private cartDependencies: cartDependencies) {}

  async create(req: Request, res: Response) {
    const body = req.body;

    const cart = await this.cartDependencies.cartRepository.create(body.userId);

    return res.status(201).json(cart);
  }

  async addProduct(req: Request, res: Response) {
    const body = req.body;

    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const tokenDecoded = <any>jwt.verify(token[1], config.jwtSecret);

    const details = await this.cartDependencies.cartRepository.addProduct(
      tokenDecoded.cartId,
      body.productId,
      body.quantity
    );

    return res.status(201).json(details);
  }

  async getById(req: Request, res: Response) {
    const cart = await this.cartDependencies.cartRepository.getById(
      req.params.id
    );
    return res.status(200).json(cart);
  }
}
