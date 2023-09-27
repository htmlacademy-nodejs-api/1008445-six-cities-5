import { IFileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { TOffer } from '../../types/index.js';
import { TOfferType } from '../../../const.js';

export class TSVFileReader implements IFileReader {
  private rawData = '';
  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): TOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        date,
        city,
        previewImage,
        images,
        isPremium,
        isFavorite,
        rating,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        host,
        comments,
        location,
      ]) => ({
        title,
        description,
        date: new Date(date),
        city,
        previewImage,
        images: images.split(';'),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: +rating,
        type: TOfferType[ type as 'apartment' | 'house' | 'room' | 'hotel' ],
        bedrooms: +bedrooms,
        maxAdults: +maxAdults,
        price: +price,
        goods: goods.split(';'),
        host,
        comments: +comments,
        location: location.split(';'),
      }));
  }
}
