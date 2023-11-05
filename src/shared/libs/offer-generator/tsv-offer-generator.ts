import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, OfferType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getRandomItemsValue } from '../../helpers/index.js';
import { GENERATOR_VALUES } from '../../../const.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.descriptions);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomItemsValue<string>(this.mockData.photos, 3, 6).slice().join(';');
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const type = getRandomItem([ OfferType.Apartment, OfferType.Hotel, OfferType.Room, OfferType.House ]);
    const price = generateRandomValue(GENERATOR_VALUES.MIN_PRICE, GENERATOR_VALUES.MAX_PRICE).toString();
    const userName = getRandomItem(this.mockData.users);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const email = getRandomItem(this.mockData.emails);
    const isPremium = getRandomItem(this.mockData.isPremium);
    const bedrooms = generateRandomValue(GENERATOR_VALUES.MIN_BEDROOMS, GENERATOR_VALUES.MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(GENERATOR_VALUES.MIN_ADULTS, GENERATOR_VALUES.MAX_ADULTS).toString();
    const city = getRandomItem(this.mockData.cities);
    const location = getRandomItem(this.mockData.locations[ city ]);
    const postDate = dayjs()
      .subtract(generateRandomValue(GENERATOR_VALUES.FIRST_WEEK_DAY, GENERATOR_VALUES.LAST_WEEK_DAY), 'day')
      .toISOString();
    const userType = getRandomItem(this.mockData.userType);

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
      email,
      userType
    ].join('\t');
  }
}
