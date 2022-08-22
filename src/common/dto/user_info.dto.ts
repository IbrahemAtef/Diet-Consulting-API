import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserInfoDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
