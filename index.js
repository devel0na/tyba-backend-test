"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Requerido por TypeORM para manejar metadatos.
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./src/database/data-source");
//Se cargan las variables de entorno para acceso general
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.port || 3000;
data_source_1.AppDataSource.initialize()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("An error has ocurred: database connection failed.", error);
  });
app.listen(port, () => {
  console.log("Server running at port: ", port);
});
