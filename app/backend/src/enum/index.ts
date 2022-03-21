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
  POST_NOT_FOUND = 'Post not found',
  TOKEN_NOT_FOUND = 'Token not found',
  TOKEN_INVALID = 'Invalid token',

  NOT_CREATE_USER = 'User not created',
  USER_CREATED = 'User created',

  NOT_USERNAME = 'Username is required',
  USERNAME_NOT_STRING = 'Username must be a string',
  USERNAME_SHORT = 'Username must be longer than 2 characters',

  NOT_CLASSE = 'Classe is required',
  CLASSE_NOT_STRING = 'Classe must be a string',
  CLASSE_SHORT = 'Classe must be longer than 2 characters',

  NOT_LEVEL = 'Level is required',
  LEVEL_NOT_NUMBER = 'Level must be a number',
  LEVEL_NOT_RIGTH = 'Level must be greater than 0',

  NOT_PASSWORD = 'Password is required',
  PASSWORD_NOT_STRING = 'Password must be a string',
  PASSWORD_SHORT = 'Password must be longer than 7 characters',

  NOT_NAME = 'Name is required',
  NAME_NOT_STRING = 'Name must be a string',
  NAME_SHORT = 'Name must be longer than 2 characters',

  NOT_AMOUNT = 'Amount is required',
  AMOUNT_NOT_STRING = 'Amount must be a string',
  AMOUNT_SHORT = 'Amount must be longer than 2 characters',

  NOT_PRODUCTS = 'Products is required',
  PRODUCTS_NOT_ARRAY = 'Products must be an array of numbers',
  PRODUCTS_SHORT = 'Products can\'t be empty',

  ORDER_NOT_FOUND = 'Order not found',

  INCORRECT_LOGIN_PASSWORD = 'Incorrect email or password',
}
