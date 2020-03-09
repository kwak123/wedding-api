import DbHelper from "./helpers/db"
import request from "supertest"
import app from "../src/app"

describe("app", () => {
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

  describe("guest", () => {
    describe("add", () => {
      it("should successfully add a guest", async () => {
        const mockGuest = makeDummyGuest({
          name: "sam",
          email: "test@test.com ",
        })
        const res = await request(app)
          .post(makeGuestUrl("add"))
          .send(mockGuest)

        expect(res.status).toEqual(200)
        expect(res.body.name).toEqual("sam")
      })
    })
  })

  const makeGuestUrl = (endpoint: string) => `/api/guest/${endpoint}`

  interface Guest {
    name: string
    email: string
    isPlusOneEligible: boolean
    plusOneId: string | null
    confirmed: boolean
    attending: false
    dietaryRestrictions: string[]
  }
  const makeDummyGuest = ({ name, email }: { name: string; email: string }) =>
    ({
      name,
      email,
      isPlusOneEligible: true,
      plusOneId: null,
      confirmed: false,
      attending: false,
      dietaryRestrictions: [],
    } as Guest)
})
