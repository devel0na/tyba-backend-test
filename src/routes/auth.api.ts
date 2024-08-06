import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();

const authController = new AuthController();

authRouter.post("/login", authController.login.bind(authController));

authRouter.post("/logout", authController.logout.bind(authController));

export default authRouter;
