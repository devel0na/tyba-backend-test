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
exports.UserController = void 0;
const CreateUserDTO_1 = require("../dtos/CreateUserDTO");
const user_service_1 = require("../services/user.service");
const data_source_1 = require("../database/data-source");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UserController {
    constructor() {
        /**
         * Consulta el servicio de creación de usuario
         * @param req request body
         * @param res response
         */
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const createUserDTO = req.body;
            const createUserValidation = (0, class_transformer_1.plainToInstance)(CreateUserDTO_1.CreateUserDTO, createUserDTO);
            const listErrors = yield (0, class_validator_1.validate)(createUserValidation);
            if (listErrors.length > 0) {
                return res.status(400).json({
                    responseCode: 400,
                    responseMessage: "Error en Validacion",
                    details: listErrors.map((error) => ({
                        property: error.property,
                        constraints: error.constraints,
                    })),
                });
            }
            try {
                yield this.userService.createUser(createUserDTO);
                res.status(201).json({
                    responseCode: 201,
                    responseMesage: "Usuario creado correctamente.",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({
                        responseCode: 400,
                        responseMessage: error.message,
                    });
                }
                else {
                    res.status(400).json({
                        responseCode: 400,
                        responseMessage: "Ha ocurrido un error. No fue posible crear el usuario.",
                    });
                }
            }
        });
        /**
         * Consulta el servicio de getOneUser
         * @param req request body
         * @param res response
         */
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { pk } = req.params;
                const userDTO = yield this.userService.getOneUser(pk);
                if (userDTO !== null) {
                    res.status(200).json({ responseCode: 0, responseMessage: userDTO });
                }
                else {
                    res.status(200).json({
                        responseCode: 400,
                        responseMessage: "El usuario no existe.",
                    });
                }
            }
            catch (error) {
                res.status(400).json({
                    responseCode: 400,
                    responseMessage: "Ha ocurrido un error. No fue posible traer el usuario.",
                });
            }
        });
        /**
         * Consulta todos los usuarios de la plataforma
         * @param req request body
         * @param res respose
         */
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const listUser = yield this.userService.getAllUsers();
                res.status(200).json({ responseCode: 0, responseMessage: listUser });
            }
            catch (error) {
                res.status(400).json({
                    responseCode: 400,
                    responseMessage: "Ha ocurrido un error. No fue posible traer los usuarios.",
                });
            }
        });
        this.userService = new user_service_1.UserService(data_source_1.AppDataSource);
    }
}
exports.UserController = UserController;
