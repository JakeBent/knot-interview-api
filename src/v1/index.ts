import { Resource } from '@base';
import Card from './resources/card';
import Credentials from './resources/credentials';
import Ping from './resources/ping';
import User from './resources/user';

export default class V1 extends Resource {
  public prefix = '/v1';
  public resources: Resource[] = [
    new Ping(),
    new User(),
    new Credentials(),
    new Card(),
  ];

  public setupRoutes(): void {
    this.resources.forEach((resource: Resource) => {
      this.router.use(resource.prefix, resource.routes());
    });
  }
}
