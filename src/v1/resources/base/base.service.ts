import Config from '@config';
import { PrismaClient } from '@prisma/client';

export default abstract class Service {
  public config = new Config();
  public db = new PrismaClient();
}
