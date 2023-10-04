import { Logger as PinoInstance, pino, transport } from 'pino';
import { ILogger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';
import { resolve } from 'node:path';
import { injectable } from 'inversify';

@injectable()
export class PinoLogger implements ILogger {
  private readonly logger: PinoInstance;
  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          options: {},
          level: 'info'
        }
      ],
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created...');
  }

  warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]) {
    this.logger.error(error, message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.logger.debug(message, ...args);
  }

  info(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }
}
