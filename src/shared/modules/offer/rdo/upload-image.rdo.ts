import { Expose } from 'class-transformer';

export class UploadImageRdo {
  @Expose()
  public photos: string[];
}
