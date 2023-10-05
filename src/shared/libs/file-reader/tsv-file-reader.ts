import { IFileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
const CHUNK_SIZE = 16384;

export class TSVFileReader extends EventEmitter implements IFileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nexLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nexLinePosition = remainingData.indexOf('\n')) >= 0) {
        const competeRow = remainingData.slice(0, nexLinePosition + 1);
        remainingData = remainingData.slice(++nexLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', competeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
