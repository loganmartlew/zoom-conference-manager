import { ZoomTokenResponse } from '@zoom-conference-manager/types';
import axios from 'axios';
import { zoom } from '../config';
import { Logger } from '../loaders/logger';

const zoomTokenUrl = `https://zoom.us/oauth/token`;
const grantType = `account_credentials`;

export default class ZoomTokenService {
  private static instance: ZoomTokenService;

  private token: string;

  private static refreshing = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): ZoomTokenService {
    if (!ZoomTokenService.instance) {
      ZoomTokenService.instance = new ZoomTokenService();
    }

    return ZoomTokenService.instance;
  }

  public static async getToken(): Promise<string> {
    const service = ZoomTokenService.getInstance();

    if (!service.token || service.token === '') {
      if (this.refreshing) {
        Logger.info(`Waiting for token to refresh`);
        while (this.refreshing) {
          // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } else {
        await ZoomTokenService.refreshToken();
      }
    }

    return service.token;
  }

  public static async refreshToken() {
    this.refreshing = true;

    const service = ZoomTokenService.getInstance();

    const [newToken, timeout] = await ZoomTokenService.fetchToken();
    service.token = newToken;

    this.refreshing = false;

    setTimeout(() => {
      service.token = '';
    }, timeout - 10);
  }

  private static async fetchToken(): Promise<[string, number]> {
    const zoomConfig = zoom();

    Logger.info('Fetching new Zoom token');

    const url = `${zoomTokenUrl}?grant_type=${grantType}&account_id=${zoomConfig.accountId}`;
    const config = {
      auth: {
        username: zoomConfig.clientId,
        password: zoomConfig.clientSecret,
      },
    };

    const res = await axios.post<ZoomTokenResponse>(url, null, config);
    return [res.data.access_token, res.data.expires_in];
  }
}
