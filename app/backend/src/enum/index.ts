export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum MSG {
  TOKEN_NOT_FOUND = 'Token not found',
  TOKEN_INVALID = 'Invalid token',

  INCORRECT_EMAIL_PASSWORD = 'Incorrect email or password',
  INVALID_FIELDS = 'All fields must be filled',

  CLUB_DOES_NOT_EXIST = 'club does not exist',
  THERE_IS_NO_TEAM_WITH_SUCH_ID = 'There is no team with such id!',
}
