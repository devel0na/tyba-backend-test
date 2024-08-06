import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class UserDTO {
  @IsString()
  pk: string;

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

  constructor(
    pk: string,
    name: string,
    surname: string,
    email: string,
    phone: number
  ) {
    this.pk = pk;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
  }
}
