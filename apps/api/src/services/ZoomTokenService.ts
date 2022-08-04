import { ZoomTokenResponse } from '@zoom-conference-manager/types';
import axios from 'axios';
import { zoom } from '../config';

const zoomTokenUrl = `https://zoom.us/oauth/token`;
const grantType = `account_credentials`;

export default class ZoomTokenService {
  private static instance: ZoomTokenService;

  private token: string;

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

    if (!service.token || service.token === '')
      await ZoomTokenService.refreshToken();

    return service.token;
  }

  public static async refreshToken() {
    const service = ZoomTokenService.getInstance();

    const [newToken, timeout] = await ZoomTokenService.fetchToken();
    service.token = newToken;

    setTimeout(() => {
      service.token = '';
    }, timeout - 10);
  }

  private static async fetchToken(): Promise<[string, number]> {
    const zoomConfig = zoom();

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
