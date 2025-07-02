import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsString } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  ANONYMOUS = 'anonymous',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;  // obrigatório

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole; // Por padrão, será 'admin' no registro
}
