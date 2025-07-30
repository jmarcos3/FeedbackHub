import { IsInt, IsString, Length, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @Length(1, 256)
  content: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; 

}