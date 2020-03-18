import DbHelper from "./helpers/db"
import "@testing-library/jest-dom"

afterAll(async () => {
  const dbHelper = new DbHelper()
  await dbHelper.closeConnection()
  return
})
