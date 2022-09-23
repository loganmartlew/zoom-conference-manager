export default class ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;
  public readonly parentError: unknown;

  constructor(parentError: unknown) {
    this.message = 'An unknown error occurred';
    this.errorCode = 1000;
    this.statusCode = 500;
    this.parentError = parentError;
  }
}
