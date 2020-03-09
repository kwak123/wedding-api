import mongoClient, { Guest } from "../../src/mongo/client"
import { WeddingGuest } from "../../src/mongo/schemas/guest"
import redisClient from "../../src/redis/client"

const TEST_DB_NAME = "test"

class DbTestHelper {
  async resetDb() {
    if (process.env.NODE_ENV !== "test") {
      throw "You're trying to delete a non-test database!"
    }
    await this.clearDb()
    return true
  }

  async clearDb() {
    await Guest.deleteMany({})
    return true
  }

  async closeConnection() {
    await mongoClient.close()
    await redisClient.quit()
    return
  }
}

export { WeddingGuest }
export default DbTestHelper
