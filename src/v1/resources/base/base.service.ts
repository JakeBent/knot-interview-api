import Config from '@config';
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

export default abstract class Service {
  public config = new Config();
  public db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();

    this.db.$extends(fieldEncryptionExtension());
  }
}
