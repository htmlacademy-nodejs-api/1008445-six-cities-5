import { ICommand } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/t-s-v-file-reader.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [ filename ] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }

      console.error(`Can't import data from file: ${ filename }`);
      console.error(`Details: ${ e.message }`);
    }
  }
}
