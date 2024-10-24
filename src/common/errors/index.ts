/* eslint-disable max-classes-per-file */

export class DBConnectionError extends Error {
  static message = 'DB not connected';
  message = DBConnectionError.message;
}

export class ServerError extends Error {
  static message = 'Server error';
  message = ServerError.message;
}

export class DuplicateUserError extends Error {
  static message = 'User with that email already exists';
  message = DuplicateUserError.message;
}

export class IncorrectAuthError extends Error {
  static message = 'Incorrect email or password';
  message = IncorrectAuthError.message;
}
