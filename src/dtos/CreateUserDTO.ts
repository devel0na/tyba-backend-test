import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
} from "class-validator";

export class CreateUserDTO {
  @IsString({ message: "El campo name debe ser una cadena de texto." })
  @IsNotEmpty({ message: "El campo name es obligatorio." })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ' ]*$/, {
    message: "El nombre solo puede contener letras.",
  })
  name: string;

  @IsString({ message: "El campo surname debe ser una cadena de texto." })
  @IsNotEmpty({ message: "El campo surname es obligatorio." })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ' ]*$/, {
    message: "El nombre solo puede contener letras.",
  })
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsOptional()
  phone: number;

  @IsString({ message: "El campo password debe ser una cadena de texto." })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  constructor(
    name: string,
    surname: string,
    email: string,
    phone: number,
    password: string
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
