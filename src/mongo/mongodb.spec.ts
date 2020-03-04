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
      const dummyName = "Dummy name"
      const dummyEmail = "dummyEmail@dummy.com"
      const dummyGuest = makeDummyGuest({ name: dummyName, email: dummyEmail })

      await MongoDb.addGuest(dummyGuest)

      const result = await Guest.findOne({ email: dummyEmail })
      expect(result.name).toEqual(dummyName)
      expect(result.email).toEqual(dummyEmail)
    })
  })

  describe("getAllGuests", () => {
    it("should return all guests", async () => {
      const dummyName = "Dummy name"
      const dummyEmail = "dummyEmail@dummy.com"
      const dummyGuest = makeDummyGuest({ name: dummyName, email: dummyEmail })

      await Guest.create(dummyGuest)

      const guestList = await MongoDb.getAllGuests()
      expect(guestList).toHaveLength(1)
      expect(guestList[0]).toMatchObject({
        name: dummyName,
        email: dummyEmail,
      })
    })
  })

  const makeDummyGuest = ({
    name,
    email,
  }: {
    name: string
    email: string
  }): WeddingGuest => ({
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
