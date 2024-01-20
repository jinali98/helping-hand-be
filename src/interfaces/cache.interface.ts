export interface CachingServiceInterface {
  getCachedData(key: any): Promise<any | Error>;
  setCache(key: any, value: any): Promise<any | Error>;
}
