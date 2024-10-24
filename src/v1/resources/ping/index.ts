import { Resource } from '@base';
import PingController from './ping.controller';

export default class Ping extends Resource {
  public prefix = '/ping';
  private controller = new PingController();

  public setupRoutes(): void {
    this.router.get('/', this.controller.read);
  }
}
