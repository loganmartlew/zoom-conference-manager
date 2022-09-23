import ApiError from '../ApiError';
import ErrorOptions from '../ErrorOptions';

export default class DbError extends ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor(parentError: unknown, options: ErrorOptions) {
    super(parentError);
    const { message, errorCode, statusCode } = options;

    this.message = message ?? 'An unknown database error occurred';
    this.errorCode = errorCode ?? 3000;

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
