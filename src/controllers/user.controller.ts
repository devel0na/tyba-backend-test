import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserService } from "../services/user.service";
import { AppDataSource } from "../database/data-source";
import { UserDTO } from "../dtos/UserDTO";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import crypto from "crypto";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(AppDataSource);
  }

  /**
   * Consulta el servicio de creación de usuario
   * @param req request body
   * @param res response
   */
  public createUser = async (req: Request, res: Response) => {
    const createUserDTO: CreateUserDTO = req.body;
    const createUserValidation = plainToInstance(CreateUserDTO, createUserDTO);

    const listErrors = await validate(createUserValidation);

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
      await this.userService.createUser(createUserDTO);

      res.status(201).json({
        responseCode: 201,
        responseMessage: "Usuario creado correctamente.",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          responseCode: 400,
          responseMessage: error.message,
        });
      } else {
        res.status(400).json({
          responseCode: 400,
          responseMessage:
            "Ha ocurrido un error. No fue posible crear el usuario.",
        });
      }
    }
  };

  /**
   * Consulta el servicio de getOneUser
   * @param req request body
   * @param res response
   */
  public getOne = async (req: Request, res: Response) => {
    try {
      const { pk } = req.params;
      const userDTO: UserDTO | null = await this.userService.getOneUser(pk);

      if (userDTO !== null) {
        res.status(200).json({ responseCode: 0, responseMessage: userDTO });
      } else {
        res.status(200).json({
          responseCode: 400,
          responseMessage: "El usuario no existe.",
        });
      }
    } catch (error) {
      res.status(400).json({
        responseCode: 400,
        responseMessage:
          "Ha ocurrido un error. No fue posible traer el usuario.",
      });
    }
  };

  /**
   * Consulta todos los usuarios de la plataforma
   * @param req request body
   * @param res respose
   */
  public getAll = async (req: Request, res: Response) => {
    try {
      const listUser: UserDTO[] = await this.userService.getAllUsers();

      res.status(200).json({ responseCode: 0, responseMessage: listUser });
    } catch (error) {
      res.status(400).json({
        responseCode: 400,
        responseMessage:
          "Ha ocurrido un error. No fue posible traer los usuarios.",
      });
    }
  };
}
