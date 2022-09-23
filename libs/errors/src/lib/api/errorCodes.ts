import statusCodes from 'http-status-codes';

interface Code {
  message: string;
  statusCode: number;
}

class Code {
  constructor(input: { message: string; statusCode?: number }) {
    this.message = input.message;
    this.statusCode = input.statusCode ?? statusCodes.INTERNAL_SERVER_ERROR;
  }
}

type Codes = Record<number, Code>;

const unknownCodes: Codes = {
  1000: new Code({
    message: 'An unknown error occurred',
  }),
};

const httpCodes: Codes = {
  2000: new Code({
    message: 'An unknown HTTP error occurred',
  }),
};

const dbCodes: Codes = {
  3000: new Code({
    message: 'An unknown database error occurred',
  }),
  3001: new Code({
    message: 'Unable to connect to the database',
  }),
  3002: new Code({
    message: 'Object not found',
    statusCode: statusCodes.NOT_FOUND,
  }),
  3003: new Code({
    message: 'Unable to save object',
  }),
  3004: new Code({
    message: 'Unable to create object',
  }),
  3005: new Code({
    message: 'Unable to delete object',
  }),
  3006: new Code({
    message: 'Unable to update object',
  }),
};

const validationCodes: Codes = {
  4000: new Code({
    message: 'An unknown validation error occurred',
  }),
  4001: new Code({
    message: 'Invalid data provided',
  }),
  4002: new Code({
    message: 'Incorrect data format',
  }),
  4003: new Code({
    message: 'Missing required data',
  }),
  4004: new Code({
    message: 'Unable to process data',
  }),
  4005: new Code({
    message: 'System at capacity',
  }),
};

const allCodes = {
  ...unknownCodes,
  ...httpCodes,
  ...dbCodes,
  ...validationCodes,
};

const validCodesArr = Object.keys(allCodes).map((code) => parseInt(code, 10));

export const validCodes = new Set(validCodesArr);

export default allCodes;
