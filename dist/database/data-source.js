"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../models/user.model");
const config_1 = __importDefault(require("../config/config"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.default.dbHost,
    port: Number(config_1.default.dbPort),
    username: config_1.default.dbUser,
    password: config_1.default.dbPassword,
    database: config_1.default.dbName,
    entities: [user_model_1.User],
    synchronize: false,
});
