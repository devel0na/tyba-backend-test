"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
const class_validator_1 = require("class-validator");
class UserDTO {
    constructor(pk, name, surname, email, phone) {
        this.pk = pk;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
    }
}
exports.UserDTO = UserDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "pk", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "El campo name debe ser una cadena de texto." }),
    (0, class_validator_1.IsNotEmpty)({ message: "El campo name es obligatorio." }),
    (0, class_validator_1.Matches)(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ' ]*$/, {
        message: "El nombre solo puede contener letras.",
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "El campo surname debe ser una cadena de texto." }),
    (0, class_validator_1.IsNotEmpty)({ message: "El campo surname es obligatorio." }),
    (0, class_validator_1.Matches)(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ' ]*$/, {
        message: "El nombre solo puede contener letras.",
    }),
    __metadata("design:type", String)
], UserDTO.prototype, "surname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "phone", void 0);
