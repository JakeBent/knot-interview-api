import { Service } from '@base';

export default class PingService extends Service {
  public read = async () => {
    await this.db.$executeRaw`SELECT 1`;

    return 'OK';
  };
}
