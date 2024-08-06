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
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = require("bcrypt");
class UserService {
    constructor(dataSource) {
        /**
         * Función que crea el usuario en el repositorio
         * @param createUser DTO de Creación de usuario
         * @returns Promesa de la creación del usuario
         */
        this.createUser = (createUser) => __awaiter(this, void 0, void 0, function* () {
            //Verificamos si el usuario ya existe
            const userExist = yield this.getOneUser("email#" + createUser.email);
            if (userExist !== null) {
                throw new Error("Ha ocurrido un error. El usuario ya existe.");
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(createUser.password, 10);
            const createUserRepository = this.userRepository.create(Object.assign(Object.assign({}, createUser), { pk: "email#" + createUser.email, password: hashedPassword }));
            return this.userRepository.save(createUserRepository);
        });
        /**
         * Servicio que trae un usuario
         * @param pk pk del usuario
         * @returns el usuario encontrado o null
         */
        this.getOneUser = (pk) => __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { pk: pk } });
        });
        /**
         * Servicio que trae todos los usuarios de la base de datos
         * @returns todos los usuarios de la base de datos
         */
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
        this.userRepository = dataSource.getRepository(user_model_1.User);
    }
}
exports.UserService = UserService;
