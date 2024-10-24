import { IncorrectAuthError } from '@common/errors';
import Config from '@config';
import logger from '@logger';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function userAuth(
  req: Request,
  res: Response,
  next: () => void,
) {
  const config = new Config();
  const { headers: { 'x-auth-token': token } } = req;

  if (!token) {
    const { message, stack } = new IncorrectAuthError();
    logger.error(message);
    logger.debug(stack);
    return res.status(401).send({ message });
  }

  let payload: TokenPayload;
  try {
    payload = jwt.verify(token as string, config.jwtSecret) as TokenPayload;
    const { user } = payload;

    req.user = user;

    delete payload.iat;
    delete payload.exp;

    const newToken = jwt.sign(
      payload,
      config.jwtSecret,
      config.jwtOptions,
    );
    req.token = newToken;
  } catch (error) {
    const { message, stack } = error as Error;
    logger.error(message);
    logger.debug(stack);
    return res.status(401).send({ message });
  }

  return next();
}
