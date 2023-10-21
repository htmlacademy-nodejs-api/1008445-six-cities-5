import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, OfferType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { GeneratorValues } from '../../../const.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.descriptions);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const type = getRandomItem([ OfferType.Apartment, OfferType.Hotel, OfferType.Room, OfferType.House ]);
    const price = generateRandomValue(GeneratorValues.MIN_PRICE, GeneratorValues.MAX_PRICE).toString();
    const userName = getRandomItem(this.mockData.users);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const email = getRandomItem(this.mockData.emails);
    const isPremium = getRandomItem(this.mockData.isPremium);
    const bedrooms = generateRandomValue(GeneratorValues.MIN_BEDROOMS, GeneratorValues.MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(GeneratorValues.MIN_ADULTS, GeneratorValues.MAX_ADULTS).toString();
    const location = getRandomItem(this.mockData.locations);
    const city = getRandomItem(this.mockData.cities);
    const postDate = dayjs()
      .subtract(generateRandomValue(GeneratorValues.FIRST_WEEK_DAY, GeneratorValues.LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title,
      description,
      previewImage,
      postDate,
      photos,
      type,
      price,
      isPremium,
      city,
      bedrooms,
      maxAdults,
      location,
      avatarUrl,
      goods,
      userName,
      email
    ].join('\t');
  }
}
