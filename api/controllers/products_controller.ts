import { Request, Response } from "express";
import config from "../../config";
import { ProductRepository } from "../../services/repository/product_repository";
import * as jwt from "jsonwebtoken";
import { JwtDecode } from "../../ultilities/decode";

type ProductDependencies = {
  productRepository: ProductRepository;
  jwtDecode: JwtDecode;
};

export class ProductsController {
  constructor(private productDependencies: ProductDependencies) {}
  async create(req: Request, res: Response) {
    try {
      console.log("req", req.body);
      const body = req.body;
      const product = await this.productDependencies.productRepository.create(
        body.name,
        body.price
      );

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({
        message: "Create product failed",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      console.log("req", req.body);
      const body = req.body;
      const product = await this.productDependencies.productRepository.update(
        req.params.id,
        body.name,
        body.price
      );

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({
        message: "Update product failed",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const body = req.body;
      const product = await this.productDependencies.productRepository.delete(
        req.params.id
      );

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({
        message: "Delete product failed",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      console.log("req", req.body);
      const product = await this.productDependencies.productRepository.getAll();

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  }

  async getById(req: Request, res: Response) {
    this.productDependencies.jwtDecode.decodeToken(req.headers.authorization);
    try {
      const product = await this.productDependencies.productRepository.getById(
        req.params.id
      );

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({
        message: "Not found product",
      });
    }
  }
}
