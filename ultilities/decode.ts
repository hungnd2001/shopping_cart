import * as jwt from "jsonwebtoken";
import config from "../config";
export class JwtDecode {
  decodeToken(authorHeader: string): Promise<string> {
    const usertoken = authorHeader;
    const token = usertoken.split(" ");
    const decoded = <any>jwt.verify(token[1], config.jwtSecret);
    console.log(decoded);
    return decoded;
  }
}
