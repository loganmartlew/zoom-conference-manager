import ApiError from './ApiError';
import ApiErrorOptions from './ApiErrorOptions';

export default class ValidationError extends ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor(parentError: unknown, options: ApiErrorOptions) {
    super(parentError);
    const { message, errorCode, statusCode } = options;

    this.message = message ?? 'An unknown validation error occurred';
    this.errorCode = errorCode ?? 4000;

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
