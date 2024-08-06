"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const data_source_1 = require("../database/data-source");
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const newToken = yield this.authService.login(password, email);
                res.cookie("accessToken", newToken, { httpOnly: true });
                res.status(200).json({
                    responseCode: 200,
                    responseMessage: "Inicio de sesión exitoso.",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res
                        .status(400)
                        .json({ responseCode: 400, responseMessage: error.message });
                }
                else {
                    res.status(400).json({
                        responseCode: 400,
                        responseMessage: "Ha ocurrido un error. No fue posible completar el proceso.",
                    });
                }
            }
        });
        this.logout = (req, res) => {
            var _a;
            try {
                const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    return res
                        .status(401)
                        .json({ responseCode: 401, responseMessage: "No existe token." });
                }
                res.cookie("accessToken", "logout", { httpOnly: true });
                res.status(200).json({
                    responseCode: 401,
                    responseMessage: "Cierre de sesión existoso.",
                });
            }
            catch (error) {
                res.status(400).json({
                    responseCode: 400,
                    responseMessage: "Ha ocurrido un error. No fue posible completar el proceso.",
                });
            }
        };
        this.authService = new auth_service_1.AuthService(data_source_1.AppDataSource);
    }
}
exports.AuthController = AuthController;
