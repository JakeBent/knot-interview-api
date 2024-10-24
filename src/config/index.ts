/* eslint-disable no-param-reassign */

import dotenv from 'dotenv';
import path from 'path';

const nodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default class Config {
  private static _sharedConfig: Config;

  // General
  public nodeEnv = nodeEnv;
  public port: number = Number(process.env.PORT) ?? 3001;
  public salt: number = Number(process.env.BCRYPT_SALT) ?? 10;
  public jwtSecret = process.env.JWT_SECRET ?? 'Mantequilla';
  public jwtOptions = { expiresIn: '72h' };

  // DB
  public dbUrl = process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/knot-interview-api?schema=public';
  public modelOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_: any, result: any) => {
        delete result.password;
      },
    },
  };

  public netflixApiUrl = 'https://netflix.com';
  public netflixApiKey = 'asdfasdf';
  public netflixApiSecret = 'asdfasdf';

  public instacartApiUrl = 'https://instacart.com';
  public instacartApiKey = 'asdfasdf';
  public instacartApiSecret = 'asdfasdf';

  static get sharedConfig(): Config {
    if (!this._sharedConfig) {
      this._sharedConfig = new Config();
    }

    return this._sharedConfig;
  }
}
