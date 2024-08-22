import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsEmail()
  readonly correo: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly clave: string;

  @IsString()
  readonly roles: string;

  @IsString()
  readonly telefono: string;
}
