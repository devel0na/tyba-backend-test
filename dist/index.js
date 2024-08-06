"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata"); // Requerido por TypeORM para manejar metadatos.
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./database/data-source");
const user_api_1 = __importDefault(require("./routes/user.api"));
const auth_api_1 = __importDefault(require("./routes/auth.api"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const config_1 = __importDefault(require("./config/config"));
const locations_api_1 = __importDefault(require("./routes/locations.api"));
const app = (0, express_1.default)();
const port = config_1.default.port || 3000;
app.use(express_1.default.json());
app.use("/api", auth_api_1.default);
app.use(auth_middleware_1.verifyToken);
app.use("/api/users", user_api_1.default);
app.use("/api/locations", locations_api_1.default);
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
exports.default = app;
