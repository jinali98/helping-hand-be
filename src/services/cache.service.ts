import { CachingServiceInterface } from "../interfaces/cache.interface";

import client from "../configs/redis.config";

export class CachingService implements CachingServiceInterface {
  async getCachedData(key: string) {
    try {
      const cachedData = await client.get(key);

      if (cachedData) {
        return JSON.parse(cachedData);
      }

      return null;
    } catch (err) {
      console.error(err);
    }
  }
  async setCache(key: string, value: any) {
    try {
      await client.setEx(key, 300, JSON.stringify(value)); // Set the cache timeout to 5 minutes (300 seconds)
    } catch (err) {
      console.error(err);
    }
  }
}
