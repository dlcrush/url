export interface IUrl {
  setBaseUrl(baseUrl: string): void;
  setPath(path: string): void;
  setQueryParams(params: UrlQueryParams): void;
  getBaseUrl(): string;
  getPath(): string;
  getQueryParams(): UrlQueryParams;
  build(opts?: { baseUrl?: string, path?: string, queryParams?: UrlQueryParams }): string;
}

export interface UrlQueryParams {
  [key: string]: string
}
