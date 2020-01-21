import client from "./client"

class RedisHelper {
  // Smallest TTL Enum is 1s
  private ONE_HOUR = 1 * 60 * 60

  cacheStringForRetrieval = (key: string, value: string) =>
    this.storeString(key, value)

  getCachedString = (key: string) => this.retrieveString(key)

  private storeString: (key: string, value: string) => Promise<boolean> = (
    key,
    value
  ) =>
    new Promise((resolve, reject) => {
      try {
        client.set(key, value, (err, result) => {
          if (err) {
            console.error(
              `Failed to set key ${key} with value ${value}`,
              err.message
            )
            return reject(err)
          }
          client.expire(key, this.ONE_HOUR, (err, success) => {
            if (err) {
              console.error(`Failed to set TTL on ${key}`, err.message)
              return reject(err)
            }
            return resolve(success >= 0)
          })
        })
      } catch (e) {
        console.log("Failed inside promise?", e.message)
        reject(e)
      }
    })

  private retrieveString: (key: string) => Promise<string> = key =>
    new Promise((resolve, reject) => {
      client.get(key, (err, result) => {
        if (err) {
          console.error(`Failed to get key ${key}!`, err.message)
          return reject(err)
        }
        // Don't care necessarily about the result of this
        client.del(key, (err, delResult) => {
          if (err) {
            console.error(`Failed to del key ${key}!`, err.message)
            return reject(err)
          }
          console.log(`Intentionally ignoring deleteResult: ${delResult}`)
          return resolve(result)
        })
      })
    })
}

const instance = new RedisHelper()

export default instance
