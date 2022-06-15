import bodyParser from "body-parser";
import express from "express";
import { checkJwt } from "../middlewares/check_jwt";
import authRouter from "./routers/auth.router";
import cartRouter from "./routers/cart.router";
import orderRouter from "./routers/order.router";
import paymentRouter from "./routers/payment.router";
import productRouter from "./routers/product.router";
import { createMap } from "@automapper/core";
import { Users } from "../models/users";
import { UserDto } from "../dtos/user_dto";
import { mapper } from "../mappers/mapper";

const app = express();
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
  })
);

app.use("/auth", authRouter);

app.use("/products", checkJwt, productRouter);

app.use("/orders", checkJwt, orderRouter);

app.use("/payment", checkJwt, paymentRouter);

app.use("/cart", checkJwt, cartRouter);

app.get("/", (req, res) => {
  return res.status(200).send("Hello");
});

createMap(mapper, Users, UserDto).reverse();
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
