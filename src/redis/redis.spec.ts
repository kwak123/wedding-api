import client from "./client"
import redisClient from "./index"

describe("redis tests", () => {
  it("cacheStringForRetrieval stores string into map", async () => {
    const mockKey = "key"
    const mockValue = "value"
    const result = await redisClient.cacheStringForRetrieval(mockKey, mockValue)

    expect(result).toBe(true)
    await checkKeyValue(mockKey, mockValue)
  })

  it("getCachedString pulls string from map and deletes string", async () => {
    const mockKey = "key"
    const mockValue = "value"

    await addKeyValuePair(mockKey, mockValue)
    const result = await redisClient.getCachedString(mockKey)
    expect(result).toEqual(mockValue)
    await checkKeyValue(mockKey, null)
  })

  const checkKeyValue = (key: string, expected: string) =>
    new Promise((resolve, reject) =>
      client.get(key, (err, res) => {
        if (err) {
          return reject(err)
        }
        expect(res).toEqual(expected)
        return resolve()
      })
    )

  const addKeyValuePair = (key: string, value: string) =>
    new Promise((resolve, reject) =>
      client.set(key, value, (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })
    )
})
