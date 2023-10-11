import dayjs from 'dayjs';
import { ReviewGenerator } from './review-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem } from '../../helpers/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVReviewGenerator implements ReviewGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const commentText = getRandomItem(this.mockData.reviewTexts);
    const reviewDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      reviewDate,
      commentText,
      rating
    ].join('\t');
  }
}
