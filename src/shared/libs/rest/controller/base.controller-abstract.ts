import asyncHandler from 'express-async-handler';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { IController } from './controller.interface.js';
import { Router, Response } from 'express';
import { ILogger } from '../../logger/index.js';
import { IRoute } from '../types/route.interface.js';
import { DEFAULT_CONTENT_TYPE } from '../../../../const.js';
import { Component } from '../../../types/index.js';
import { PathTransformer } from '../transform/path-transformer.js';
@injectable()
export abstract class BaseController implements IController {
  public readonly router: Router;
  @inject(Component.PathTransformer)
  private pathTransformer: PathTransformer;

  constructor(protected readonly logger:ILogger) {
    this.router = Router();
  }

  addRoute(route: IRoute) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers
      ? [ ...middlewareHandlers, wrapperAsyncHandler ]
      : wrapperAsyncHandler;
    this.router[ route.method ](route.path, allHandlers);
    this.logger.info(`Route registered: ${ route.method.toUpperCase() } ${ route.path }`);
  }

  send<T>(res: Response, statusCode: number, data: T) {
    const modifiedData = this.pathTransformer.execute(data as Record<string, unknown>);
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(modifiedData);
  }

  created<T>(res: Response, data: T) {
    this.send(res, StatusCodes.CREATED, data);
  }


  noContent<T>(res: Response, data: T) {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  ok<T>(res: Response, data: T) {
    this.send(res, StatusCodes.OK, data);
  }
}
