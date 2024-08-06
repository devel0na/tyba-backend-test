"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    googleApiKey: process.env.GOOGLE_API_KEY || "",
    jwtSecret: process.env.JWT_SECRET || "",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
    dbHost: process.env.DB_HOST || "localhost",
    dbPort: parseInt(process.env.DB_PORT || "5432", 10),
    dbUser: process.env.DB_USERNAME || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_NAME || "",
    port: parseInt(process.env.SERVER_PORT || "3000", 10),
    hostName: process.env.HOST_NAME || "localhost",
    baseUrl: process.env.BASE_URL || "",
};
exports.default = config;
