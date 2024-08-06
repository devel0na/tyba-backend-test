import { Router } from "express";
import { LocationsController } from "../controllers/locations.controller";

const locationsRouter = Router();

const locationsController = new LocationsController();

locationsRouter.post(
  "/restaurants",
  locationsController.getRestaurants.bind(locationsController)
);

export default locationsRouter;
