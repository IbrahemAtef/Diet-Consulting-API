import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnswersDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  recommendations: string;
}
