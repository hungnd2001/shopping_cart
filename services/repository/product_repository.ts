import { ProductDto } from "../../dtos/product_dto";
import { IProductsService } from "../interface_repository/interface_product";
import AppDataSource from "../../data-source";
import { Products } from "../../models/products";
import { Users } from "../../models/users";
export class ProductRepository implements IProductsService {
  async create(name: string, price: number): Promise<ProductDto> {
    console.log("name" + name + " price" + price);
    const productCreated = await AppDataSource.manager.create(Products, {
      name: name,
      price: price,
    });

    console.log("created" + productCreated);

    const product = await AppDataSource.manager.save(productCreated);

    console.log("created");

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
  async update(id: string, name: string, price: number): Promise<ProductDto> {
    const productFinded = await AppDataSource.manager.findOne(Products, {
      where: {
        id: id,
      },
    });

    productFinded.name = name;
    productFinded.price = price;

    const product = await AppDataSource.manager.save(productFinded);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
  async getAll(): Promise<ProductDto[]> {
    const productList = await AppDataSource.manager.find(Products);
    return productList;
  }
  async getById(id: string): Promise<ProductDto> {
    const product = await AppDataSource.manager.findOne(Products, {
      where: {
        id: id,
      },
    });

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
  async delete(id: string): Promise<ProductDto> {
    const product = await AppDataSource.manager.findOne(Products, {
      where: {
        id: id,
      },
    });

    await AppDataSource.manager.delete(Products, product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
