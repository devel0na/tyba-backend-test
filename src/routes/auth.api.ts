import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";

const authRouter = Router();

const authController = new AuthController();
const userController = new UserController();

authRouter.post("/signup", userController.createUser.bind(userController));
authRouter.post("/login", authController.login.bind(authController));

authRouter.post("/logout", authController.logout.bind(authController));

export default authRouter;
