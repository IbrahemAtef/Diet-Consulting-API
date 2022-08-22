import { PartialType } from "@nestjs/mapped-types";
import { CreateAnswersDto } from "./create-answers.dto";

export class UpdateAnswersDto extends PartialType(CreateAnswersDto) {}
