import { defaultClasses, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { TUser } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
  options: {
    allowMixed: Severity.ALLOW,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  @prop({
    unique: true,
    required: true
  })
  public email: string;

  @prop({
    required: true,
    default: ''
  })
  public name: string;

  @prop({
    required: true,
    default: ''
  })
  public password?: string;

  @prop({
    required: true,
    default: ''
  })
  public avatarUrl: string;

  @prop({
    required: true,
    default: false
  })
  public isPro: boolean;

  @prop({
    required: true,
    default: []
  })
  public favoriteOffers: string[];

  constructor(userData: TUser) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.avatarUrl = userData.avatarUrl;
    this.isPro = userData.isPro;
    this.favoriteOffers = [];
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
