import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionsEnum } from "../enums";

const UnAuthorizedUser = new HttpException(
  ExceptionsEnum.USER_NOT_AUTHORIZED,
  HttpStatus.UNAUTHORIZED
);

const UserNotFound = new HttpException(
  ExceptionsEnum.USER_NOT_FOUND,
  HttpStatus.NOT_FOUND
);

const UserAlreadyExists = new HttpException(
  ExceptionsEnum.USER_ALREADY_EXISTS,
  HttpStatus.CONFLICT
);

const DraftAlreadyExists = new HttpException(
  ExceptionsEnum.DRAFT_ALREADY_EXISTS,
  HttpStatus.CONFLICT
);

const QuestionNotFound = new HttpException(
  ExceptionsEnum.QUESTION_NOT_FOUND,
  HttpStatus.NOT_FOUND
);

const QuestionNotForUser = new HttpException(
  ExceptionsEnum.QUESTION_NOT_FOR_USER,
  HttpStatus.NOT_FOUND
);

const AnswerNotFound = new HttpException(
  ExceptionsEnum.ANSWER_NOT_FOUND,
  HttpStatus.NOT_FOUND
);

const InvalidCredentials = new HttpException(
  ExceptionsEnum.INVALID_CREDENTIALS,
  HttpStatus.UNAUTHORIZED
);

export {
  UnAuthorizedUser,
  UserNotFound,
  UserAlreadyExists,
  DraftAlreadyExists,
  QuestionNotFound,
  AnswerNotFound,
  InvalidCredentials,
  QuestionNotForUser,
};
