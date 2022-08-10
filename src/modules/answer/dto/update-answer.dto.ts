import { CreateAnswerDto } from "./create-answer.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {}
