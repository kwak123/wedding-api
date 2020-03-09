import DbHelper, { WeddingGuest } from "./helpers/db"
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

        await dbHelper.addGuest(mockGuest)

        const badRes = await request(app)
          .post(makeGuestUrl("add"))
          .send(mockGuest)

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

  describe("link", () => {
    it("should link two guests", async () => {
      const mockName = "sam"
      const mockEmail = "sam@test.com"
      const linkedName = "elysia"
      const linkedEmail = "elysia@test.com"

      const mockGuest = makeDummyGuest({
        name: mockName,
        email: mockEmail,
      })

      const linkedGuest = makeDummyGuest({
        name: linkedName,
        email: linkedEmail,
      })

      await dbHelper.addGuest(mockGuest)
      await dbHelper.addGuest(linkedGuest)

      const res = await request(app)
        .post(makeGuestUrl("link/"))
        .send({
          guestEmail: mockEmail,
          plusOneEmail: linkedEmail,
        })

      expect(res.body.email).toEqual(mockEmail)
      // While not authoritative, schema allots for oid OR null, so if NOT null, this must exist
      expect(res.body.plusOneId).not.toBeNull()
    })
  })

  const makeGuestUrl = (endpoint: string) => `/api/guest/${endpoint}`

  const makeDummyGuest = ({ name, email }: { name: string; email: string }) =>
    ({
      name,
      email,
      isPlusOneEligible: true,
      plusOneId: null,
      isAttending: false,
      isConfirmed: false,
      dietaryRestrictions: [],
    } as WeddingGuest)
})
