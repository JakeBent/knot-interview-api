import { UnknownClientError } from '@common/errors';
import Config from '@config';
import logger from '@logger';
import axios, { AxiosInstance } from 'axios';

export default class ApiClient {
  private static _sharedInstance = new ApiClient();

  private config = new Config();

  public async swapCard(creds: Creds, card: Card) {
    const client = await this.authenticate(creds);

    /**
     * And this is where it should attempt to swap out
     * the card with the specified merchant via an
     * available API or other programmatic execution
     */

    logger.info(`
      Attempting to swap default card from ${creds.website}
      to ${card.network} card with the last
      four digits ${card.lastFour}
    `);

    await client.get('http://example.com');

    logger.success('Success!');
  }

  public async authenticate(creds: Creds) {
    let client: AxiosInstance;

    switch (creds.website) {
      case 'netflix.com':
        client = axios.create({
          baseURL: this.config.netflixApiUrl,
        });
        break;
      case 'instacart.com':
        client = axios.create({
          baseURL: this.config.instacartApiUrl,
        });
        break;
      default:
        throw new UnknownClientError();
    }

    /**
     * This where it should authenticate with the selected
     * website, whether that's via an available API or
     * other programmatic execution (scraping & filling?
     * automated interaction with testing library like
     * cypress?) and return an axios client with
     * pre-configured authorization
     */

    logger.info(`
      Attempting to log into ${creds.website}
      with username ${creds.username}
      and password ${creds.password}
    `);

    await client.get('http://example.com');

    client.defaults.headers.common.Authorization = `Bearer ${'fake-access-token'}`;

    return client;
  }

  public static sharedInstance() {
    if (!this._sharedInstance) {
      this._sharedInstance = new ApiClient();
    }

    return this._sharedInstance;
  }
}
