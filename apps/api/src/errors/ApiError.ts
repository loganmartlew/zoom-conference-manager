/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class ApiError {
  public readonly message: string;
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor() {
    this.message = 'An unknown error occurred';
    this.errorCode = 9000;
    this.statusCode = 500;
  }
}
