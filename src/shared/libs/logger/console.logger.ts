import { ILogger } from './logger.interface.js';
import { injectable } from 'inversify';
import { getErrorMessage } from '../../helpers/index.js';

@injectable()
export class ConsoleLogger implements ILogger {
  warn(message: string, ...args: unknown[]) {
    console.warn(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]) {
    console.error(message, ...args);
    console.error(`Error message: ${ getErrorMessage(error)}`);
  }

  debug(message: string, ...args: unknown[]) {
    console.debug(message, ...args);
  }

  info(message: string, ...args: unknown[]) {
    console.info(message, ...args);
  }
}
