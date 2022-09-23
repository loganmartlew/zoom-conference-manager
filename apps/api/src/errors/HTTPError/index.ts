import ApiError from '../ApiError';
import ErrorOptions from '../ErrorOptions';

/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class HTTPError extends ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor(options: ErrorOptions) {
    super();
    const { message, errorCode, statusCode } = options;

    this.message = message ?? 'An unknown HTTP error occurred';
    this.errorCode = errorCode ?? 2000;

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
