import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { OfferType, TLocation } from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import { TCity } from '../../types/city.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true }
  )
  public title!: string;

  @prop()
  public postDate!: Date;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public city!: TCity;

  @prop()
  public previewImage!: string;

  @prop()
  public photos: string[];

  @prop()
  public isPremium!: boolean;

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
  public location!: TLocation;
}

export const OfferModel = getModelForClass(OfferEntity);
