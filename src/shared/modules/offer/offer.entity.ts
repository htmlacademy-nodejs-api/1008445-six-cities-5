import { OfferType } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true }
  )
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public city!: string;

  @prop()
  public previewImage!: string;

  @prop()
  public photos: string[];

  @prop()
  public isFavorite!: boolean;

  @prop()
  public isPremium!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public type !: OfferType;

  @prop()
  public bedrooms!: number;

  @prop()
  public maxAdults!: number;

  @prop()
  public price!: number;

  @prop({ default: 0 })
  public reviewsCount!: number;

  @prop({
    required: true,
    default: []
  })
  public goods: string[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true,
    default: {}
  })
  public location!: object;
}

export const OfferModel = getModelForClass(OfferEntity);
