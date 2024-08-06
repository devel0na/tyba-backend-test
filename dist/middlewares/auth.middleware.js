"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
        return res.status(401).json({
            responseCode: 401,
            responseMessage: "No se encuentra el token.",
        });
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            responseCode: 401,
            responseMessage: "No se encuentra el token.",
        });
    }
    if (!config_1.default.jwtSecret) {
        return res.status(500).json({
            responseCode: 500,
            responseMessage: "Error del servidor. Por favor intentélo más tarde.",
        });
    }
    try {
        const infoUser = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res
                .status(401)
                .json({ responseCode: 401, responseMessage: "El token ha expirado" });
        }
    }
};
exports.verifyToken = verifyToken;
