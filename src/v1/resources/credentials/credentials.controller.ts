import { Controller } from '@base';
import { Request, Response } from 'express';
import CredentialsService from './credentials.service';

export default class CredentialsController extends Controller {
  public service = new CredentialsService();

  public create = async (req: Request<{}, {}, CredentialsCreateDTO>, res: Response) => {
    const {
      body: {
        website,
        username,
        password,
      },
      user: {
        id: userId,
      },
    } = req;

    req.message = 'Created credentials';
    req.operation = this.service.create;
    req.args = {
      userId,
      website,
      username,
      password,
    };
    req.successCode = 201;

    res.exec();
  };

  public read = async (req: Request, res: Response) => {
    const { user: { id: userId } } = req;

    req.message = 'Retrieved credentials';
    req.operation = this.service.read;
    req.args = { userId };

    res.exec();
  };
}
