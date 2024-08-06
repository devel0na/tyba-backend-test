"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
userRouter.get("/:pk", userController.getOne.bind(userController));
userRouter.get("/", userController.getAll.bind(userController));
exports.default = userRouter;
