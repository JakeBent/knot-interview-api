import { Controller } from '@base';
import { Request, Response } from 'express';
import UserService from './user.service';

export default class UserController extends Controller {
  public service = new UserService();

  public signup = async (req: Request<{}, {}, UserSignupDTO>, res: Response) => {
    const {
      body: {
        email,
        password,
        firstName,
        lastName,
      },
    } = req;

    req.message = 'Created user';
    req.operation = this.service.signup;
    req.args = {
      email,
      password,
      firstName,
      lastName,
    };
    req.successCode = 201;

    res.exec();
  };

  public login = async (req: Request<{}, {}, UserLoginDTO>, res: Response) => {
    const {
      body: { email, password },
    } = req;

    req.message = 'Authenticated user';
    req.operation = this.service.login;
    req.args = { email, password };

    res.exec();
  };

  public me = async (req: Request, res: Response) => {
    const { user } = req;

    req.operation = this.service.me;
    req.args = { user };

    res.exec();
  };

  public swapCard = async (req: Request<{}, {}, UserSwapDTO>, res: Response) => {
    const {
      body: { credId, cardId },
      user: { id: userId },
    } = req;

    req.message = 'Attempting to swap card';
    req.operation = this.service.swapCard;
    req.args = { userId, credId, cardId };

    res.exec();
  };
}
