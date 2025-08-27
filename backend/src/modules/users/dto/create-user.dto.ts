import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  ANONYMOUS = 'anonymous',
}

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Nome de usuário do sistema',
  })
  @IsNotEmpty()
  @IsString()
  username: string;  

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email únicoválido do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Senha do usuário (mínimo 6 caracteres)',
    minLength: 6,
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: UserRole.ADMIN,
    description: 'Função do usuário no sistema',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole; 
}
