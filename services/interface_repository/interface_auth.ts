import { UserDto } from "../../dtos/user_dto";
import { ErrorDto } from "../../errors/error_dto";
import { Users } from "../../models/users";

export interface IAuthService<T> {
  login(username: string, password: string): Promise<UserDto | ErrorDto>;
  register(username: string, password: string): Promise<UserDto | ErrorDto>;
}
