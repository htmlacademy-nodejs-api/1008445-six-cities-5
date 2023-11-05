import { UserType } from '../../const';

export default class UserDto {
  public email!: string ;
  public avatarUrl!: string;
  public name!: string;
  public type!: UserType;
}
