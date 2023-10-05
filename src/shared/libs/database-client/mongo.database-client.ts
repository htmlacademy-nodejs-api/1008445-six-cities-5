import { inject, injectable } from 'inversify';
import { IDatabaseClient } from './database-client.interface.js';
import * as Mongoose from 'mongoose';
import { Component } from '../../types/index.js';
import { ILogger } from '../logger/index.js';
import { setTimeout } from 'node:timers/promises';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 5;

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }
    this.logger.info('Trying to connect to MongoDB...');
    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established');
        return;
      } catch (e) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${ attempt }`, e as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }
    throw new Error(`Unable to establish database connection after ${ RETRY_COUNT }`);
  }

  public async disconnect(): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('Not connected to database');
    }
    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed');
  }
}
