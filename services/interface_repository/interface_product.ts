import { ProductDto } from "../../dtos/product_dto";
import { ErrorDto } from "../../errors/error_dto";

export interface IProductsService {
  create(name: string, price: number): Promise<ProductDto | ErrorDto>;
  update(
    id: string,
    name: string,
    price: number
  ): Promise<ProductDto | ErrorDto>;
  getAll(): Promise<ProductDto[]>;
  getById(id: string): Promise<ProductDto | ErrorDto>;
  delete(id: string): Promise<ProductDto | ErrorDto>;
}
