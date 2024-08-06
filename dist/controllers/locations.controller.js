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
exports.LocationsController = void 0;
const locations_service_1 = require("../services/locations.service");
const class_transformer_1 = require("class-transformer");
const LatLngDTO_1 = require("../dtos/LatLngDTO");
const class_validator_1 = require("class-validator");
class LocationsController {
    constructor() {
        this.getRestaurants = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const latLngDTO = req.body;
            const latLngValidation = (0, class_transformer_1.plainToInstance)(LatLngDTO_1.LatLngDTO, latLngDTO);
            const listErrors = yield (0, class_validator_1.validate)(latLngValidation);
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
                const restaurantsList = yield this.locationsService.getRestaurantsByLatLng(latLngDTO);
                res
                    .status(200)
                    .json({ responseCode: 0, responseMessage: restaurantsList });
            }
            catch (error) {
                res.status(400).json({
                    responseCode: 400,
                    responseMessage: "Ha ocurrido un error. No es posible procesar la solicitud.",
                });
            }
        });
        this.locationsService = new locations_service_1.LocationsService();
    }
}
exports.LocationsController = LocationsController;
