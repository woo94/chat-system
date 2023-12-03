import express, { ErrorRequestHandler } from "express";
import { AppDataSource } from "~/datasource";
import { ChatSystemError } from "~/module";
import morgan from "morgan";
import { userRouter } from "./router/user";

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("TypeORM datasource initialize success");
  })
  .catch((err) => {
    console.log("TypeORM datasource initailize fail!!!");
    console.log(err);
  });

const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ChatSystemError) {
    return res.status(err.status).json(err.body);
  } else {
    console.log(err);
    return res.status(500).json(err);
  }
};

app.use(morgan("dev"));
app.use(express.json());
app.use("/user", userRouter);

app.use(defaultErrorHandler);

app.listen(2614, () => {
  console.log("server is running on port 2614");
});
