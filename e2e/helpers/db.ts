import client, { Guest } from "../../src/mongo/client"

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
    return client.close()
  }
}

export default DbTestHelper
