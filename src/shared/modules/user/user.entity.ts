import { TUser } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  @prop({ unique: true, required: true })
  public email = '';

  @prop({ required: true, default: '' })
  public name = '';

  @prop({ required: true, default: '' })
  public password = '';

  @prop({ required: true, default: '' })
  public avatarUrl = '';

  @prop({ required: true, default: false })
  public isPro = false;

  constructor(userData: TUser) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.password = userData.password;
    this.avatarUrl = userData.avatarUrl;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
