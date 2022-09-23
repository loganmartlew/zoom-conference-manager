import ApiError from '../ApiError';
import ErrorOptions from '../ErrorOptions';

/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class DbError extends ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor(options: ErrorOptions) {
    super();
    const { message, errorCode, statusCode } = options;

    this.message = message ?? 'An unknown database error occurred';
    this.errorCode = errorCode ?? 3000;

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
