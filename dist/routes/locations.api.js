"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locations_controller_1 = require("../controllers/locations.controller");
const locationsRouter = (0, express_1.Router)();
const locationsController = new locations_controller_1.LocationsController();
locationsRouter.post("/restaurants", locationsController.getRestaurants.bind(locationsController));
exports.default = locationsRouter;
