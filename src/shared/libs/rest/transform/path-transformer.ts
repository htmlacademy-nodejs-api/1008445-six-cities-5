import { inject, injectable } from 'inversify';
import { RESOURCES } from './path-transformer.const.js';
import { Component } from '../../../types/index.js';
import { ILogger } from '../../logger/index.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from '../../../../rest/rest.constant.js';
import { getFullServerPath } from '../../../helpers/index.js';
import { IConfig, TRestSchema } from '../../config/index.js';

function isUrl(value: string) {
  return value.startsWith('http');
}
function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isArray(value: unknown): value is string[] {
  return typeof value === 'object' && value !== null && Array.isArray(value);
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
  ) {
    this.logger.info('PathTransformer created!');
  }

  private hasDefaultImage(value: string) {
    return RESOURCES.DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return RESOURCES.STATIC_RESOURCE_FIELDS.includes(property);
  }

  private transform(value: string) {
    const staticPath = STATIC_FILES_ROUTE;
    const uploadPath = STATIC_UPLOAD_ROUTE;
    const serverHost = this.config.get('HOST');
    const serverPort = this.config.get('PORT');
    const rootPath = this.hasDefaultImage(value) ? staticPath : uploadPath;
    return `${ getFullServerPath(serverHost, serverPort, false) }${ rootPath }/${ value }`;
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [ data ];
    while (stack.length > 0) {
      const current = stack.pop();
      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[ key ];
          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key)) {
            if (typeof value === 'string') {
              current[ key ] = isUrl(value) ? value : this.transform(value);
            }

            if (isArray(value)) {
              current[ key ] =
                value.map((element) => isUrl(element) ? element : this.transform(element));
            }
          }
        }
      }
    }

    return data;
  }
}
