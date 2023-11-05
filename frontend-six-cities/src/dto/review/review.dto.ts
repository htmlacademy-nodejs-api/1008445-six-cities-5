import UserDto from '../user/user.dto';

export default class ReviewDto {
  public id!: string;
  public comment!: string;
  public rating!: number;
  public postDate!: string;
  public user!: UserDto;
}
