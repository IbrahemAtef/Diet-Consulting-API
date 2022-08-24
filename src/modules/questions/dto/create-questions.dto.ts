import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { MessageEnum } from "src/common/enums";
import { TAGS } from "./../../../common/enums/tags.enums";

export class CreateQuestionsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TAGS, {
    message: MessageEnum.CHECK_TAGS,
  })
  tags: TAGS;
}
