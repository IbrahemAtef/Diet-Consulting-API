export enum MessageEnum {
  CHECK_ROLE = "role must be either patient or consultant",
  WEAK_PASSWORD = "password is weak",
  UNAUTHORIZED_EXCEPTION = "You are not authorized to perform the operation",
  INVALID_CREDENTIALS = "Invalid user credentials",
  UPDATE_FAILED = "This Todo doesn't exist or you need to change something",
  UPDATE_SUCCEEDED = "Successfully updated",
  DELETE_FAILED = "This Todo doesn't exist",
  DELETE_SUCCEEDED = "Successfully deleted",
}
