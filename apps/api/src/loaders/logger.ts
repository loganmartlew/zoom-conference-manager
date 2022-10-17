import { Express } from 'express';
import winston from 'winston';
import morgan from 'morgan';
import chalk from 'chalk';
import { environment } from '../environments/environment';

const transports = [];
if (environment.mode !== 'development') {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

export const Logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
});

export default async (app: Express) => {
  if (environment.mode !== 'development') {
    app.use(morgan('combined'));
    return;
  }

  const method = (methodString: string) => {
    const create = chalk.bold.green;
    const read = chalk.bold.cyan;
    const update = chalk.bold.yellow;
    const deletes = chalk.bold.red;

    switch (methodString.toLowerCase()) {
      case 'get':
        return read(methodString);
      case 'post':
        return create(methodString);
      case 'put':
      case 'patch':
        return update(methodString);
      case 'delete':
        return deletes(methodString);

      default:
        return chalk.bold(methodString);
    }
  };

  const status = (statusCode: string) => {
    const types = {
      success: { color: chalk.green, regex: /^2/i },
      serverError: { color: chalk.red, regex: /^5/i },
      clientError: { color: chalk.yellow, regex: /^4/i },
      redirect: { color: chalk.cyan, regex: /^3/i },
      info: { color: chalk.white, regex: /^1/i },
    };

    const output = Object.values(types).reduce((out, type) => {
      if (statusCode.match(type.regex)) {
        return type.color(statusCode);
      }

      return out;
    }, '');

    return output;
  };

  const response = (responseTime: string) => {
    const fast = chalk.dim.green;
    const medium = chalk.dim.yellow;
    const slow = chalk.dim.red;

    if (+responseTime < 50) {
      return fast(responseTime);
    }

    if (+responseTime < 200) {
      return medium(responseTime);
    }

    return slow(responseTime);
  };

  app.use(
    morgan((tokens, req, res) => {
      return [
        method(tokens.method(req, res) || '-'),
        chalk.italic(tokens.url(req, res)),
        status(tokens.status(req, res) || '-'),
        `${response(tokens['response-time'](req, res) || '-')}ms`,
        '::',
        tokens.date(req, res),
      ].join(' ');
    })
  );
};
