import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    example: 'Sala Teste criada via Swagger',
    description: 'Titulo da sala'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    example: 'Esta é uma sala de teste',
    description: 'Descrição da sala de no máximo 255 caracteres'
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
