import got from 'got';
import path from 'node:path';
import { ICommand } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class GenerateCommand implements ICommand {
  private initData: MockServerData;
  private async load(url: string) {
    try {
      this.initData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${ url }`);
    }
  }

  public getName(): string {
    return '--generate';
  }

  private async write(filepath: string, offersCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offersCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [ count, filepath, url ] = parameters;
    this.validateParameters(parameters);
    const offerCount = parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${ filepath } was created!`);
    } catch (e: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(e));
    }
  }

  private validateParameters(parameters: string[]) {
    const [ count, filepath, url ] = parameters;
    if (isNaN(Number(count))) {
      throw new Error(`Offers count '${ count }' is not a number`);
    }
    if (!path.resolve(filepath)) {
      throw new Error(`File path '${ filepath }' is invalid`);
    }
    if (!this.validateUrl(url)) {
      throw new Error(`Url '${ url }' is invalid`);
    }
  }

  private validateUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }
}
