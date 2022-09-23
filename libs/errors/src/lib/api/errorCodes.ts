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
};

const validationCodes: Codes = {
  4000: new Code({
    message: 'An unknown validation error occurred',
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
