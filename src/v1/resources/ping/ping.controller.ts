import { Controller } from '@base';
import { Request, Response } from 'express';
import PingService from './ping.service';

export default class PingController extends Controller {
  public service = new PingService();

  public read = async (req: Request, res: Response) => {
    req.operation = this.service.read;

    res.exec();
  };
}
