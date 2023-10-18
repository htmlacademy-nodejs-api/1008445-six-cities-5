import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, OfferType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const MIN_RATING = 1;
const MAX_RATING = 8;
const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;
const MIN_ADULTS = 1;
const MAX_ADULTS = 10;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.descriptions);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photo = getRandomItems<string>(this.mockData.photos).join(';');
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const type = getRandomItem([ OfferType.Apartment, OfferType.Hotel, OfferType.Room, OfferType.House ]);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const userName = getRandomItem(this.mockData.users);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const email = getRandomItem(this.mockData.emails);
    const isFavorite = getRandomItem(this.mockData.isFavorite);
    const isPremium = getRandomItem(this.mockData.isPremium);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const location = getRandomItem(this.mockData.locations);
    const city = getRandomItem(this.mockData.cities);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, previewImage, date,
      photo, type, price, isFavorite, isPremium, rating,
      city, bedrooms, maxAdults, location, avatarUrl,
      goods, userName, email
    ].join('\t');
  }
}
