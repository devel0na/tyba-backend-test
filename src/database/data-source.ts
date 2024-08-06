import { DataSource } from "typeorm";
import { User } from "../models/user.model";
import config from "../config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.dbHost,
  port: Number(config.dbPort),
  username: config.dbUser as string,
  password: config.dbPassword as string,
  database: config.dbName,
  entities: [User],
  synchronize: false,
});
