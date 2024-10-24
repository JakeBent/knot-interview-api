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

export class UnknownClientError extends Error {
  static message = 'Attempted to auth with unknown client';
  message = UnknownClientError.message;
}

export class UnknownCardError extends Error {
  static message = 'Could not find card info';
  message = UnknownCardError.message;
}
