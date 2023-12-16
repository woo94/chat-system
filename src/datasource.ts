import { DataSource } from "typeorm";
import { User } from "~/entity";

const host = (() => {
  if(process.env.NODE_ENV === "test") {
    return 'localhost'
  } else {
    return 'postgres'
  }
})()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: host,
  port: 5432,
  username: "postgres",
  password: "my-secret",
  entities: [User],
  synchronize: true,
  logging: ["error"],
});
