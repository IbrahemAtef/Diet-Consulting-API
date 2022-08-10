import {
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsString,
  IsOptional,
} from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  userNameOrEmail: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
