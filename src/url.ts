import { IUrl, UrlQueryParams } from './contracts/url';

class Url implements IUrl {
  protected baseUrl: string;

  protected path: string;

  protected queryParams: UrlQueryParams;

  constructor(opts?: { baseUrl?: string, path?: string, queryParams?: UrlQueryParams }) {
    const o = opts || {};
    this.baseUrl = o.baseUrl || '';
    this.path = o.path || '';
    this.queryParams = o.queryParams || {};
  }

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }

  setPath(path: string): void {
    this.path = path;
  }

  setQueryParams(params: UrlQueryParams): void {
    this.queryParams = params;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getPath(): string {
    return this.path;
  }

  getQueryParams(): UrlQueryParams {
    return this.queryParams;
  }

  build(opts?: { baseUrl?: string; path?: string; queryParams?: UrlQueryParams; }): string {
    const o = opts || {};
    const baseUrl = o.baseUrl || this.baseUrl || '';
    const path = o.path || this.path || '';
    const queryParams = o.queryParams || this.queryParams || {};

    return `${baseUrl}${path}${Url.buildQueryString(queryParams)}`;
  }

  static parseQueryParams(url: string): UrlQueryParams {
    const parts = url.split('?');

    if (parts.length < 2) {
      return {};
    }

    const urlParams = new URLSearchParams(parts[1]);
    const returnValue = {};

    /* eslint-disable-next-line */
    for (const [key, value] of urlParams.entries()) {
      returnValue[key] = value;
    }

    return returnValue;
  }

  protected static buildQueryString(queryParams: UrlQueryParams): string {
    return Object.keys(queryParams).reduce((prev: string, key: string) => {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        return `${prev}${(prev.indexOf('?') === -1 ? '?' : '&')}${key}=${queryParams[key]}`;
      }

      return prev;
    }, '');
  }
}

export default Url;
