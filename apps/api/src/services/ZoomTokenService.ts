const zoomTokenUrl = `https://zoom.us/oauth/token`;
const grantType = ``;

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

    if (!service.token) await ZoomTokenService.refreshToken();

    return service.token;
  }

  public static async refreshToken() {
    const service = ZoomTokenService.getInstance();

    service.token = await ZoomTokenService.fetchToken();
  }

  private static fetchToken(): string {
    return '';
  }
}
