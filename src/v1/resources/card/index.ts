import { Resource } from '@base';
import userAuth from '@common/middleware/auth';
import CardController from './card.controller';

export default class Credentials extends Resource {
  public prefix = '/cards';
  private controller = new CardController();

  public setupRoutes(): void {
    this.router.post('/', userAuth, this.controller.create);
    this.router.get('/', userAuth, this.controller.read);
  }
}
