import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
