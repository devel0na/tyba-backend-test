import { DataSource, Repository } from "typeorm";
import { User } from "../models/user.model";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

export class AuthService {
  private userRepository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  /**
   * Servicio que valida si la información del usuario es correcta para el login
   * @param password contraseña del usuario
   * @param email email del usuario
   * @returns información del usuario o null si alguno de los dos es incorrecto
   */
  public login = async (password: string, email: string): Promise<string> => {
    //Validaciones de existencia del user y contraseña correcta
    const validateUser = await this.userRepository.findOne({
      where: { pk: "email#" + email },
    });
    if (!validateUser) {
      throw new Error("Ha ocurrido un error. Usuario no encontrado");
    }

    const isMatch = await compare(password, validateUser.password);

    if (!isMatch) {
      throw new Error("Contraseña incorrecta.");
    }
    if (!config.jwtSecret) {
      throw new Error("Ha ocurrido un error. Inténtelo más tarde.");
    }

    const newToken = jwt.sign({ pk: "email#" + email }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    return newToken;
  };

  public logout = (): string => {
    return "TODO";
  };
}
