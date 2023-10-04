import { IConfig } from './config.interface.js';
import { config } from 'dotenv';
import { ILogger } from '../logger/index.js';
import { TRestSchema, configRestSchema } from './rest.schema.js';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/index.js';
@injectable()
export class RestConfig implements IConfig<TRestSchema> {
  private readonly config: TRestSchema;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    const parsedOut = config();

    if (parsedOut.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exist');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  get<T extends keyof TRestSchema>(key: T): TRestSchema[T] {
    return this.config[ key ];
  }
}
