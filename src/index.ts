import "dotenv/config";
import "reflect-metadata"; // Requerido por TypeORM para manejar metadatos.
import express from "express";
import { AppDataSource } from "./database/data-source";
import userRouter from "./routes/user.api";
import authRouter from "./routes/auth.api";
import { verifyToken } from "./middlewares/auth.middleware";
import config from "./config/config";
import locationsRouter from "./routes/locations.api";

const app = express();
const port = config.port || 3000;

app.use(express.json());

app.use("/api", authRouter);

app.use(verifyToken);
app.use("/api/users", userRouter);
app.use("/api/locations", locationsRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("An error has ocurred: database connection failed.", error);
  });

app.listen(port, () => {
  console.log("Server running at port: ", port);
});

export default app;
