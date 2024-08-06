import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService(AppDataSource);
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const newToken = await this.authService.login(password, email);
      res.cookie("accessToken", newToken, { httpOnly: true });
      res.status(200).json({
        responseCode: 200,
        responseMessage: "Inicio de sesión exitoso.",
      });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ responseCode: 400, responseMessage: error.message });
      } else {
        res.status(400).json({
          responseCode: 400,
          responseMessage:
            "Ha ocurrido un error. No fue posible completar el proceso.",
        });
      }
    }
  };

  public logout = (req: Request, res: Response) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ responseCode: 401, responseMessage: "No existe token." });
      }

      res.cookie("accessToken", "logout", { httpOnly: true });
      res.status(200).json({
        responseCode: 401,
        responseMessage: "Cierre de sesión existoso.",
      });
    } catch (error) {
      res.status(400).json({
        responseCode: 400,
        responseMessage:
          "Ha ocurrido un error. No fue posible completar el proceso.",
      });
    }
  };
}
