import ApiError from '../ApiError';
import ErrorOptions from '../ErrorOptions';

export default class HTTPError extends ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor(parentError: unknown, options: ErrorOptions) {
    super(parentError);
    const { message, errorCode, statusCode } = options;

    this.message = message ?? 'An unknown HTTP error occurred';
    this.errorCode = errorCode ?? 2000;

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
