import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
