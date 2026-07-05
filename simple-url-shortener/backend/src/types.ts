export interface ShortenedUrl {
  shortCode: string;
  shortUrl: string;
}

export interface ShortenRequest {
  url: string;
}

export type UrlMap = Record<string, string>;
