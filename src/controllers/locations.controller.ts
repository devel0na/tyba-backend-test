import { Request, Response } from "express";
import { LocationsService } from "../services/locations.service";
import { plainToInstance } from "class-transformer";
import { LatLngDTO } from "../dtos/LatLngDTO";
import { validate } from "class-validator";

export class LocationsController {
  private locationsService: LocationsService;

  constructor() {
    this.locationsService = new LocationsService();
  }

  public getRestaurants = async (req: Request, res: Response) => {
    const latLngDTO = req.body;
    const latLngValidation = plainToInstance(LatLngDTO, latLngDTO);
    const listErrors = await validate(latLngValidation);

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
      const restaurantsList =
        await this.locationsService.getRestaurantsByLatLng(latLngDTO);
      res
        .status(200)
        .json({ responseCode: 0, responseMessage: restaurantsList });
    } catch (error) {
      res.status(400).json({
        responseCode: 400,
        responseMessage:
          "Ha ocurrido un error. No es posible procesar la solicitud.",
      });
    }
  };
}
