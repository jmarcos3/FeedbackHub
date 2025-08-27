import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'Email de um usuário válido'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Senha do usuário (mínimo 6 caracteres)'
  })
  @MinLength(6)
  password: string;
}
