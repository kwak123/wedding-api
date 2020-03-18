import "@testing-library/jest-dom"

if (process.env.NODE_ENV !== "test-ui") {
  afterAll(async () => {
    const { default: DbHelper } = await import("./helpers/db")
    const dbHelper = new DbHelper()
    await dbHelper.closeConnection()
    return
  })
}
