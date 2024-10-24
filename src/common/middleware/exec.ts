import { DBConnectionError, DuplicateUserError, IncorrectAuthError } from '@common/errors';
import logger from '@logger';
import { Request, Response } from 'express';

export default function applyExec(
  req: Request,
  res: Response,
  next: () => void,
) {
  res.exec = async () => {
    const {
      operation,
      args,
      message,
      successCode = 200,
      token,
    } = req;

    try {
      const data = await operation(args);

      if (req.path === '/login' || req.path === '/signup') {
        res.status(successCode).send({
          message,
          token: data,
        });
      } else {
        res.status(successCode).send({
          message,
          data,
          token,
        });
      }
    } catch (error) {
      const { message: errMessage, stack } = error as Error;

      logger.error(errMessage);
      logger.debug(stack);

      let errorCode: number;

      switch (errMessage) {
        case DuplicateUserError.message:
          errorCode = 400;
          break;
        case IncorrectAuthError.message:
          errorCode = 401;
          break;
        case DBConnectionError.message:
          errorCode = 500;
          break;
        default:
          errorCode = 500;
          break;
      }

      res.status(errorCode).send({
        message: errMessage,
      });
    }
  };

  next();
}
