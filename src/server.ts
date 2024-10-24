import applyExec from '@common/middleware/exec';
import Config from '@config';
import logger from '@logger';
import V1 from '@v1';
import bodyParser from 'body-parser';
import Express from 'express';
import morgan from 'morgan';

export default class Server {
  public server: Express.Application;
  public config: Config;
  public v1: V1;

  constructor() {
    this.config = new Config();
    this.server = Express();
    this.v1 = new V1();
  }

  async register() {
    this.server.use(bodyParser.json());
    this.server.use(morgan('tiny'));
    this.server.use(applyExec);
    this.server.use(this.v1.prefix, this.v1.routes());
  }

  async start() {
    const {
      port,
      dbUrl,
    } = this.config;

    logger.info('connecting to db server...');
    logger.success(`connected to db at ${dbUrl}`);

    logger.info('starting server...');
    this.server.listen({ port });
    logger.success(`started server on port ${port}`);
  }
}
