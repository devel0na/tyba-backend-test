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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class AuthService {
    constructor(dataSource) {
        /**
         * Servicio que valida si la información del usuario es correcta para el login
         * @param password contraseña del usuario
         * @param email email del usuario
         * @returns información del usuario o null si alguno de los dos es incorrecto
         */
        this.login = (password, email) => __awaiter(this, void 0, void 0, function* () {
            //Validaciones de existencia del user y contraseña correcta
            const validateUser = yield this.userRepository.findOne({
                where: { pk: "email#" + email },
            });
            if (!validateUser) {
                throw new Error("Ha ocurrido un error. Usuario no encontrado");
            }
            const isMatch = yield (0, bcrypt_1.compare)(password, validateUser.password);
            if (!isMatch) {
                throw new Error("Contraseña incorrecta.");
            }
            if (!config_1.default.jwtSecret) {
                throw new Error("Ha ocurrido un error. Inténtelo más tarde.");
            }
            const newToken = jsonwebtoken_1.default.sign({ pk: "email#" + email }, config_1.default.jwtSecret, {
                expiresIn: config_1.default.jwtExpiresIn,
            });
            return newToken;
        });
        this.logout = () => {
            return "TODO";
        };
        this.userRepository = dataSource.getRepository(user_model_1.User);
    }
}
exports.AuthService = AuthService;
