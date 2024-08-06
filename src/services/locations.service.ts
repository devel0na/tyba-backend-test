import { Client } from "@googlemaps/google-maps-services-js";
import config from "../config/config";
import { LatLngDTO } from "../dtos/LatLngDTO";

export class LocationsService {
  private client: Client;

  constructor() {
    this.client = new Client({});
  }

  /**
   * Servicio que consulta el API Places para traer los restaurantes cercanos dada una latitud y longitud
   * @param lat latitud consultada
   * @param lng longitud consultada
   * @returns Lista de restaurantes encontrados
   */
  public getRestaurantsByLatLng = async (latLngDTO: LatLngDTO) => {
    try {
      const {
        status,
        data: { results },
      } = await this.client.placesNearby({
        params: {
          location: latLngDTO,
          key: config.googleApiKey,
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
    } catch (error) {
      throw new Error(
        "Error de Servidor. No es posible retornar los restaurantes cercanos."
      );
    }
  };
}
