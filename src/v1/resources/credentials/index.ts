import { Resource } from '@base';
import userAuth from '@common/middleware/auth';
import CredentialsController from './credentials.controller';

export default class Credentials extends Resource {
  public prefix = '/credentials';
  private controller = new CredentialsController();

  public setupRoutes(): void {
    this.router.post('/', userAuth, this.controller.create);
    this.router.get('/', userAuth, this.controller.read);
  }
}
