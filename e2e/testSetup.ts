import DbHelper from "./helpers/db"

afterAll(async () => {
  const dbHelper = new DbHelper()
  await dbHelper.closeConnection()
  return
})
