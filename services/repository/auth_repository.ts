import { UserDto } from "../../dtos/user_dto";
import { IAuthService } from "../interface_repository/interface_auth";
import AppDataSource from "../../data-source";
import { Users } from "../../models/users";
import { ErrorDto } from "../../errors/error_dto";
import { Cart } from "../../models/cart";
import * as jwt from "jsonwebtoken";
import config from "../../config";

export class AuthRepository implements IAuthService<UserDto> {
  async register(
    username: string,
    password: string
  ): Promise<UserDto | ErrorDto> {
    const created = AppDataSource.manager.create(Users, {
      name: username,
      password: password,
    });

    const user = await AppDataSource.manager.save(created);

    const cartCreated = AppDataSource.manager.create(Cart, {
      userId: user.id,
    });

    const cart = await AppDataSource.manager.save(cartCreated);

    return {
      userName: user.name,
      refreshToken: "",
      accessToken: "",
      id: user.id,
    };
  }

  async login(username: string, password: string): Promise<UserDto> {
    const user = await AppDataSource.manager.findOne(Users, {
      where: {
        name: username,
        password: password,
      },
    });

    const cart = await AppDataSource.manager.findOne(Cart, {
      where: {
        userId: user.id,
      },
    });

    console.log("user", user);
    console.log("user ", username, password);
    if (!user) {
      throw new Error("User does not exist");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.name, cartId: cart.id },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    const refreshToken = "";

    return {
      accessToken: token,
      id: user.id,
      refreshToken,
      userName: user.name,
    };
  }
}
