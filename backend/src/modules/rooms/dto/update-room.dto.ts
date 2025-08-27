import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty({
    example: 'Sala de Teste atualizado via Swagger',
    description: 'Novo nome válido da sala (máximo 100 caracteres)'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    example: 'Descrição Atualizada via Swagger',
    description: 'Nova descrição da sala (máximo 100 caracteres)'
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
