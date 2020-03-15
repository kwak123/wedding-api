import mongoose, { Document } from "mongoose"
import MongoDb from "./index"
import { WeddingGuest } from "./schemas/guest"
import client, { Guest } from "./client"

describe("mongoDb tests", () => {
  beforeEach(async () => {
    await Guest.deleteMany({})
  })

  describe("addGuest", () => {
    it("should add a guest", async () => {
      const dummyGuest = makeDummyGuest()

      await MongoDb.addGuest(dummyGuest)

      const result = await Guest.findOne({ email: dummyGuest.email })
      expect(result.name).toEqual(dummyGuest.name)
      expect(result.email).toEqual(dummyGuest.email)
    })
  })

  describe("getAllGuests", () => {
    it("should return all guests", async () => {
      const dummyGuest = makeDummyGuest()

      await Guest.create(dummyGuest)

      const guestList = await MongoDb.getAllGuests()
      expect(guestList).toHaveLength(1)
      expect(guestList[0]).toMatchObject({
        name: dummyGuest.name,
        email: dummyGuest.email,
      })
    })
  })

  describe("getOrAddGuest", () => {
    it("should get a guest, if guest already exists", async () => {
      const dummyGuest = makeDummyGuest()

      await Guest.create(dummyGuest)
      const guest = await MongoDb.getOrAddGuest(dummyGuest.email)
      expect(guest.email).toEqual(dummyGuest.email)
    })

    it("should add guest, if not already exists", async () => {
      const defaultName = "Unnamed"
      const dummyEmail = "dummyEmail@dummy.com"
      const shouldBeNull = await Guest.findOne({ email: dummyEmail })

      expect(shouldBeNull).toBeNull()

      const guest = await MongoDb.getOrAddGuest(dummyEmail)
      const shouldNotBeNull = await Guest.findOne({ email: dummyEmail })
      expect(shouldNotBeNull).not.toBeNull()
      expect(guest.name).toBe(defaultName)
      expect(guest.email).toBe(dummyEmail)
    })
  })

  const makeDummyGuest = ({
    name = "Dummy name",
    email = "dummyEmail@dummy.com",
  }: {
    name?: string
    email?: string
  } = {}): WeddingGuest => ({
    hasReceivedRsvp: false,
    isConfirmed: false,
    isAttending: false,
    name,
    isPlusOneEligible: false,
    plusOneId: null,
    email,
    dietaryRestrictions: [],
  })
})
