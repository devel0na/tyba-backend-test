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
exports.LocationsService = void 0;
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const config_1 = __importDefault(require("../config/config"));
class LocationsService {
    constructor() {
        /**
         * Servicio que consulta el API Places para traer los restaurantes cercanos dada una latitud y longitud
         * @param lat latitud consultada
         * @param lng longitud consultada
         * @returns Lista de restaurantes encontrados
         */
        this.getRestaurantsByLatLng = (latLngDTO) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, data: { results }, } = yield this.client.placesNearby({
                    params: {
                        location: latLngDTO,
                        key: config_1.default.googleApiKey,
                        radius: 1500,
                        type: "restaurant",
                    },
                    timeout: 1000,
                });
                const finalRestaurants = results.map((rest) => ({
                    restaurantName: rest.name,
                    rating: rest.rating,
                    address: rest.vicinity,
                }));
                return finalRestaurants;
            }
            catch (error) {
                throw new Error("Error de Servidor. No es posible retornar los restaurantes cercanos.");
            }
        });
        this.client = new google_maps_services_js_1.Client({});
    }
}
exports.LocationsService = LocationsService;
