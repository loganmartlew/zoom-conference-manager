import errorCodes, { validCodes } from './errorCodes';

export default class ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;
  public readonly parentError: unknown;

  constructor(
    parentError: unknown | null,
    errorCode: number | null,
    message: string | null
  ) {
    if (parentError instanceof ApiError) {
      this.parentError = null;
      this.message = parentError.message;
      this.errorCode = parentError.errorCode;
      this.statusCode = parentError.statusCode;
      return;
    }

    this.parentError = parentError;

    if (errorCode && validCodes.has(errorCode)) {
      this.errorCode = errorCode;
    } else {
      this.errorCode = 1000;
    }

    const code = errorCodes[this.errorCode];

    this.message = message ?? code.message;
    this.statusCode = code.statusCode;
  }
}
