import express from "express";
import { AppDataSource } from "~/datasource";

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("TypeORM datasource initialize success");
  })
  .catch((err) => {
    console.log("TypeORM datasource initailize fail!!!");
    console.log(err);
  });

app.listen(2614, () => {
  console.log("server is running on port 2614");
});
