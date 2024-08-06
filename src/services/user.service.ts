import { DataSource, Repository } from "typeorm";
import { User } from "../models/user.model";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { hash } from "bcrypt";
import { UserDTO } from "../dtos/UserDTO";

export class UserService {
  private userRepository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  /**
   * Función que crea el usuario en el repositorio
   * @param createUser DTO de Creación de usuario
   * @returns Promesa de la creación del usuario
   */
  public createUser = async (createUser: CreateUserDTO): Promise<User> => {
    //Verificamos si el usuario ya existe
    const userExist: UserDTO | null = await this.getOneUser(
      "email#" + createUser.email
    );

    if (userExist !== null) {
      throw new Error("Ha ocurrido un error. El usuario ya existe.");
    }

    const hashedPassword = await hash(createUser.password, 10);

    const createUserRepository = this.userRepository.create({
      ...createUser,
      pk: "email#" + createUser.email,
      password: hashedPassword,
    });

    return this.userRepository.save(createUserRepository);
  };

  /**
   * Servicio que trae un usuario
   * @param pk pk del usuario
   * @returns el usuario encontrado o null
   */
  public getOneUser = async (pk: string): Promise<UserDTO | null> => {
    return this.userRepository.findOne({ where: { pk: pk } });
  };

  /**
   * Servicio que trae todos los usuarios de la base de datos
   * @returns todos los usuarios de la base de datos
   */
  public getAllUsers = async (): Promise<User[]> => {
    return this.userRepository.find();
  };
}
