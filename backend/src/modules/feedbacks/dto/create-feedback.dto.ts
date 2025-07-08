import { IsString, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @Length(1, 255)
  content: string;
}
