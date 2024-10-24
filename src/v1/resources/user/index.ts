import { Resource } from '@base';
import userAuth from '@common/middleware/auth';
import UserController from './user.controller';

export default class User extends Resource {
  public prefix = '/users';
  private controller = new UserController();

  public setupRoutes(): void {
    this.router.post('/signup', this.controller.signup);
    this.router.post('/login', this.controller.login);
    this.router.get('/me', userAuth, this.controller.me);
  }
}
