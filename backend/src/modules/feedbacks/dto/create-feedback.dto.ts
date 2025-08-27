import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'Descrição criada para teste via swagger',
    description: 'Descrição do feedback podendo conter no máximo 256 caracteres'
  })
  @IsString()
  @Length(1, 256)
  content: string;

  @ApiProperty({
    example: '5',
    description: 'Numero de estrelas dado, podendo variar de 1 a 5'
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; 

}