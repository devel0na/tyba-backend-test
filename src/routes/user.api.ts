import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();

const userController = new UserController();

userRouter.get("/:pk", userController.getOne.bind(userController));

userRouter.get("/", userController.getAll.bind(userController));

export default userRouter;
