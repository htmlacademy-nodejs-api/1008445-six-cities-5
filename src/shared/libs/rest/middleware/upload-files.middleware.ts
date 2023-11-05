import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import * as crypto from 'node:crypto';
import { IMiddleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export class UploadMultiplyFilesMiddleware implements IMiddleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtension = extension(file.mimetype);
        const filename = crypto.randomUUID();
        return callback(null, `${ filename }.${ fileExtension }`);
      }
    });

    const uploadMultiplyFilesMiddleware = multer({
      storage,
      fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
          return cb(null, true);
        } else {
          const error = new HttpError(
            StatusCodes.BAD_REQUEST,
            'Only .png, .jpg and .jpeg format allowed',
            'UploadFilesMiddleware'
          );
          return cb(error);
        }
      },
    })
      .array(this.fieldName, 6);

    uploadMultiplyFilesMiddleware(req, res, next);
  }
}
