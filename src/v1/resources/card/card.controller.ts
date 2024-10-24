import { Controller } from '@base';
import { Request, Response } from 'express';
import CardService from './card.service';

export default class CardController extends Controller {
  public service = new CardService();

  public create = async (req: Request<{}, {}, CardCreateDTO>, res: Response) => {
    const {
      body: {
        name,
        number,
        expMonth,
        expYear,
        zip,
      },
      user: {
        id: userId,
      },
    } = req;

    req.message = 'Created card';
    req.operation = this.service.create;
    req.args = {
      userId,
      name,
      number,
      expMonth,
      expYear,
      zip,
    };
    req.successCode = 201;

    res.exec();
  };

  public read = async (req: Request, res: Response) => {
    const { user: { id: userId } } = req;

    req.message = 'Retrieved cards';
    req.operation = this.service.read;
    req.args = { userId };

    res.exec();
  };
}
