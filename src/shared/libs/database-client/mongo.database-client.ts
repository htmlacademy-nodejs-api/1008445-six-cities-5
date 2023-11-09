import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';
import { IDatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../logger/index.js';
import { setTimeout } from 'node:timers/promises';
import { RETRY_OPTIONS } from './database-client.constant.js';

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.isConnected = false;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected');
    }
    this.logger.info('Trying to connect to MongoDB...');
    let attempt = 0;
    while (attempt < RETRY_OPTIONS.RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established');
        return;
      } catch (e) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${ attempt }`, e as Error);
        await setTimeout(RETRY_OPTIONS.RETRY_TIMEOUT);
      }
    }
    throw new Error(`Unable to establish database connection after ${ RETRY_OPTIONS.RETRY_COUNT }`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to database');
    }
    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed');
  }
}
