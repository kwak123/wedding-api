import client from "./client"

class RedisHelper {
  private STRING_CACHE_KEY: string = "string_cache"
  cacheStringForRetrieval = async (stringToCache: string) =>
    await this.storeString(this.STRING_CACHE_KEY, stringToCache)

  private storeString = (setName: string, value: string) =>
    new Promise((resolve, reject) => {
      client.sadd(setName, value, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
}

const instance = new RedisHelper()

export default instance
