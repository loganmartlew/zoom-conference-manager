import ApiError from './ApiError';
import ApiErrorOptions from './ApiErrorOptions';

export default class DbError extends ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor(parentError: unknown, options: ApiErrorOptions) {
    super(parentError);
    const { message, errorCode, statusCode } = options;

    this.message = message ?? 'An unknown database error occurred';
    this.errorCode = errorCode ?? 3000;

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
