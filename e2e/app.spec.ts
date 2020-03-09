import DbHelper from "./helpers/db"

describe("it", () => {
  let dbHelper: DbHelper

  beforeAll(async () => {
    dbHelper = new DbHelper()
    await dbHelper.resetDb()
    return
  })

  afterAll(async () => {
    await dbHelper.closeConnection()
    return
  })

  it("should be true", () => {
    expect(true).toBeTruthy
  })
})
