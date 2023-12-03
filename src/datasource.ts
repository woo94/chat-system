import { DataSource } from "typeorm";
import { User } from "~/entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "my-secret",
  entities: [User],
  synchronize: true,
  logging: ["error"],
});
