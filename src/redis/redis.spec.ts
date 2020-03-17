import client from "./client"
import redisClient from "./index"

describe("redis tests", () => {
  it("cacheStringForRetrieval stores string into map", async () => {
    const mockKey = "key"
    const mockValue = "value"
    const result = await redisClient.cacheStringForRetrieval(mockKey, mockValue)

    expect(result).toBe(true)
    await checkKeyExists(mockKey, mockValue)
  })

  it("getCachedString pulls string from map and deletes string", () => {
    const mockKey = "key"
    const mockValue = "value"
  })

  const checkKeyExists = (key: string, expected: string) =>
    new Promise((resolve, reject) =>
      client.get(key, (err, res) => {
        if (err) {
          return reject(err)
        }
        expect(res).toEqual(expected)
        resolve()
      })
    )
})
