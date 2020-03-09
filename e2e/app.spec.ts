import DbHelper from "./helpers/db"
import request from "supertest"
import app from "../src/app"

describe("app", () => {
  let dbHelper: DbHelper

  beforeAll(() => {
    dbHelper = new DbHelper()
  })

  beforeEach(async () => {
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
        const mockName = "sam"
        const mockEmail = "test@test.com"
        const mockGuest = makeDummyGuest({
          name: mockName,
          email: mockEmail,
        })
        const res = await request(app)
          .post(makeGuestUrl("add"))
          .send(mockGuest)

        expect(res.status).toEqual(200)
        expect(res.body.name).toEqual(mockName)
        expect(res.body.email).toEqual(mockEmail)
      })

      it("should not allow adding a guest twice", async () => {
        const mockName = "sam"
        const mockEmail = "test@test.com"
        const mockGuest = makeDummyGuest({
          name: mockName,
          email: mockEmail,
        })

        const goodRes = await request(app)
          .post(makeGuestUrl("add"))
          .send(mockGuest)

        const badRes = await request(app)
          .post(makeGuestUrl("add"))
          .send(mockGuest)

        expect(goodRes.status).toEqual(200)
        expect(badRes.status).toEqual(400)
      })
    })

    describe("get", () => {
      it("should fetch guests by email", async () => {
        const mockName = "sam"
        const mockEmail = "test@test.com"
        const mockGuest = makeDummyGuest({
          name: mockName,
          email: mockEmail,
        })
        await request(app)
          .post(makeGuestUrl("add"))
          .send(mockGuest)

        const res = await request(app).get(makeGuestUrl(`get/${mockEmail}`))

        expect(res.body.name).toEqual(mockName)
        expect(res.body.email).toEqual(mockEmail)
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
